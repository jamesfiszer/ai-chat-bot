'user strict';

var token = '<FB token>';
var aiToken = '<api.ai token>';

var apiai = require('apiai');
var ai = apiai(aiToken);

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var messagingEvents;

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	'use strict';
	res.send('hello.');
});

// for facebook verification
app.get('/webhook/', function (req, res) {
	'use strict';
	if (req.query['hub.verify_token'] === 'your_verify_token') {
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong token');
});

app.post('/webhook/', function (req, res) {
	'use strict';
	messagingEvents = req.body.entry[0].messaging;
	for (var i = 0; i < messagingEvents.length; i++) {
		var event = req.body.entry[0].messaging[i];
		var sender = event.sender.id;
		if (event.message && event.message.text) {
			var text = String(event.message.text).toLowerCase();
			if(text === 'help'){
				sendFBTextMessage(sender, 'directions go here.');
				continue;
			}
			if(text.includes('catch phrase')){
				sendFBTextMessage(sender, 'message goes here.');
				continue;
			}
			aiResponse(sender, text);
		}
		if (event.postback) {
			text = JSON.stringify(event.postback);
			sendFBTextMessage(sender, 'Postback received: ' + text.substring(0, 200), token);
			continue;
		}
	}
	res.sendStatus(200);
});


function sendFBTextMessage(sender, text) {
	var messageData = {
		text: text
	};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: {
			recipient: {id: sender},
			message: messageData
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
}

function sendFBTemplateMessage(sender, title, description, imgUrl) {
	var messageData = {
		'attachment': {
			'type': 'template',
			'payload': {
				'template_type': 'generic',
				'elements': [{
					'title': title,
					'subtitle': description,
					'image_url': imgUrl,
					'buttons': [{
						'type': 'web_url',
						'url': imgUrl,
						'title': 'Open Map'
					}]
				}]
			}
		}
	};
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: {
			recipient: {id: sender},
			message: messageData
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error);
		} else if (response.body.error) {
			console.log('Error: ', response.body.error);
		}
	});
};

function aiResponse(sender, textQuery){
	var request = ai.textRequest(textQuery);
	request.on('response', function(response) {
	    console.log('----------');
	    console.log('[Timestamp] '+response.timestamp);
	    console.log('	[USER]: '+response.result.resolvedQuery);
	    console.log('	[BOT]: '+response.result.fulfillment.speech);
	    console.log('----------');
	    console.log(response);
	    console.log('----------');
	    var responseText = String(response.result.fulfillment.speech);
	    sendFBTextMessage(sender, responseText);
	});

	request.on('error', function(error) {
		console.log('[ERROR] ----------');
	    console.log(error);
	    console.log('[ERROR] ----------');
	    var errorText = String(errorText);
	    sendFBTextMessage(sender, errorText);
	});

	request.end();
};

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});
