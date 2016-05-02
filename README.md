AI Chat Bot
=============

Chat bot starter template using Node.js.  Utilizing the Facebook Messenger platform and conversational AI platform from [api.ai](http://api.ai). This repo was created as an experiment in chat bots and learning about Facebook's new Messenger platform.  Conversational AI APIs are becoming more abundant and this was a good opportunity to try one out as well. I tried [wit.ai](http://wit.ai) but it proved difficult to get up and running quickly.  I ultimately landed to [api.ai](http://api.ai) and loved that it could carry conversational small talk right out the gate with no training.


Installation
-----------
Clone repo and run `npm install`


Usage
-----
Sign up for api.ai and follow directions here [https://docs.api.ai/docs/authentication](https://docs.api.ai/docs/authentication). Retrieve a client access token and replace var `aiToken` on line 2 of `index.js`.

Goto [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/) and create a new application.  Then go here: [https://developers.facebook.com/docs/messenger-platform/quickstart](https://developers.facebook.com/docs/messenger-platform/quickstart) to follow directions on how to setup the Facebook Messenger platform.  Once you have completed these steps you should end up with a "page access token".  Take this token and replace var `fbToken` on line 1 of `index.js`.

Once setup on both Facebook and api.ai you will need to deploy the files to a hosting environment compatible with node such as [Heroku](http://www.heroku.com).
