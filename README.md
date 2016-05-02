AI Chat Bot
=============

Chat bot starter template using Node.js.  Utilizing the Facebook Messenger platform as well as converstaional AI platform from [api.ai](http://api.ai).

This repo includes:

0. Provides conversational AI out the game without any AI training.
0. Provides starting base for using Facbeook Messenger platform.
0. 


Installation
-----------
Clone repo and run `npm install`


Usage
-----
Sign up for api.ai
Update vars `currentProjectPath` and `browserSyncPath`.

`currentProjectPath` is the root folder of your banner campaign.  This path is used for packaging related tasks.
`browserSyncPath` is the path to the current banner size that you wish to work on.  Later on if you need to switch to another size you will need to update that variable and restart the gulp task runner.  This is the path that live reloads.

To start development tasks

```js
gulp
or
gulp development
```

Build banner files for delivery

```js
gulp build
```

Misc tasks

```js
gulp clean
```
Removes `_delivery` and `_dist` directories.
