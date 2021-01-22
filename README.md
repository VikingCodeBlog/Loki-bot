![](https://i.imgur.com/QiWxvs4.png)

# Introduction

This project is a Discord bot designed exclusively for the VikingCodeBlog discord channel..

# Features

  - Autorank users and manage roles

# Tech
* [nodejs] - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [discordjs] - node.js module that allows you to interact with the Discord API
* [mongoose] - Mongoose provides a straight-forward, schema-based solution to model your application data.

# Installation

Loki-bot requires [Node.js](https://nodejs.org/) v12+ to run.
Loki-bot connect to a mongodb, you can use [Atlas](https://www.mongodb.com/)

## SetUp bot and set your enviroment variables
First of all, you need to create a bot in [https://discord.com/developers](https://discord.com/developers)

And allow this checks in bot config
![Privileged](https://i.imgur.com/pJQ2fY9.png)

Create a .env file in your project.

| Key   |      Description      |
|----------|:-------------:|
|**Bot config:**|
| TOKEN | Is the bot token you can find in https://discord.com/developers/applications/{YourBot}/bot |
| MONGOURI | Your mongo database |
| MSGUSERKEYWORD | Keyword that will be replaced from the message to the user with their name |
|**Auto role by rank config:**|
| MAXROLENAME | The maximum role that the bot can promote a user. |
| INCREASERANKINTERVAL | The time between messages that will be valued to rank up to users. |
| INCREASEROLEBYRANKINTERVAL | How often will a user be promoted |
| MINMESSAGELENGTHTORANK | Minimum length of comments for loki-bot to take them into account |
| RANKADMINS | Set it to true if you want the bot rank system to work with ADMINS |
| RANKBOTS | Set it to true if you want the bot rank system to work with BOTS |
| MSGLEVELUP | Message that the bot will send to a user when they level up |
| ANNOUNCELEVELCHANNELID | Channel ID to send a new role message|
|**Welcome new user config:**|
| WELCOMECHANNELID | Channel ID to send a welcome message |
| MSGWELCOME | Welcome message |

Example .env file:
```
TOKEN='asdkjfgldjfg'
MONGOURI='mongodb+srv://user:pass@rute/loki?retryWrites=true&w=majority'
MSGUSERKEYWORD='$USUARIO'

MAXROLENAME=rol3
RANKADMINS=true
RANKBOTS=false
INCREASERANKINTERVAL=300000
INCREASEROLEBYRANKINTERVAL=10
MINMESSAGELENGTHTORANK=5
ANNOUNCELEVELCHANNELID='37897437473989229'
MSGLEVELUP='GG, $USUARIO HAS SUBIDO DE NIVEL!'

WELCOMECHANNELID='2983749823749567'
MSGWELCOME='Welcome, $USUARIO'
```
