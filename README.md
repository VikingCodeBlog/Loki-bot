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
| MONGO_URI | Your mongo database |
| MSG_USER_KEY | Keyword that will be replaced from the message to the user with their name |
|**Auto role by rank config:**|
| MAX_ROLE_NAME | The maximum role that the bot can promote a user. |
| INCREASE_RANK_INTERVAL | The time between messages that will be valued to rank up to users. |
| INCREASE_ROLE_BY_RANK_INTERVAL | How often will a user be promoted |
| MIN_MESSAGE_LENGTH_TO_RANK | Minimum length of comments for loki-bot to take them into account |
| RANK_ADMINS | Set it to true if you want the bot rank system to work with ADMINS |
| RANK_BOTS | Set it to true if you want the bot rank system to work with BOTS |
| MSG_LEVELUP | Message that the bot will send to a user when they level up |
| ANNOUNCE_ROLE_CHANNEL_ID | Channel ID to send a new role message|
|**Welcome new user config:**|
| WELCOME_CHANNEL_ID | Channel ID to send a welcome message |
| MSG_WELCOME | Welcome message |
|**Initial role config:**|
| INITIAL_ROLE | Loki will assign this role to new users |

Example .env file:
```
TOKEN='asdkjfgldjfg'
MONGO_URI='mongodb+srv://user:pass@rute/loki?retryWrites=true&w=majority'
MSG_USER_KEY='$USUARIO'

MAX_ROLE_NAME=rol3
RANK_ADMINS=true
RANK_BOTS=false
INCREASE_RANK_INTERVAL=300000
INCREASE_ROLE_BY_RANK_INTERVAL=10
MIN_MESSAGE_LENGTH_TO_RANK=5
ANNOUNCE_ROLE_CHANNEL_ID='37897437473989229'
MSG_LEVELUP='GG, $USUARIO HAS SUBIDO DE NIVEL!'

WELCOME_CHANNEL_ID='2983749823749567'
MSG_WELCOME='Welcome, $USUARIO'

INITIAL_ROLE=Gusano
```
