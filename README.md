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
|🤖-**Bot config:**|
| TOKEN | Is the bot token you can find in https://discord.com/developers/applications/{YourBot}/bot |
| MONGO_URI | Your mongo database |
| MSG_USER_KEY | Keyword that will be replaced from the message to the user with their name |
|👩‍🎓**Auto role by rank config:**|
| MAX_ROLE_NAME | The maximum role that the bot can promote a user. |
| INCREASE_RANK_INTERVAL | The time between messages that will be valued to rank up to users. |
| INCREASE_ROLE_BY_RANK_INTERVAL | How often will a user be promoted |
| MIN_MESSAGE_LENGTH_TO_RANK | Minimum length of comments for loki-bot to take them into account |
| RANK_ADMINS | Set it to true if you want the bot rank system to work with ADMINS |
| RANK_BOTS | Set it to true if you want the bot rank system to work with BOTS |
| MSG_RANK | Message that the bot will send to a user when they ask rank. |
| MSG_RANK_KEY_WORD | Keyword that will be replaced from the rank message |
| MSG_LEVELUP | Message that the bot will send to a user when they level up |
| ANNOUNCE_ROLE_CHANNEL_ID | Channel ID to send a new role message|
|🙋‍♀️**Welcome new user config:**|
| WELCOME_CHANNEL_ID | Channel ID to send a welcome message |
| MSG_WELCOME | Welcome message |
|🐛**Initial role config:**|
| INITIAL_ROLE | Loki will assign this role to new users |
|⭐**Rating config:**|
| MSG_RATING_SCORE_KEY | Keyword that will be replaced from the rating message |
| MSG_NEW_RATING | Message that the bot will send to a user when they send new rating |
| MSG_RATING | Message that the bot will send to a user when they ask their rating |
| MSG_RATING_ERR_SHAME_USER | Message that the bot will send to a user when they try to autorating |
| MSG_RATING_ERR_SYNTAX | Message that the bot will send to a user when they send rating message with syntax error |

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
MSG_RANK_KEY_WORD=$RANKING
MSG_RANK=Tu ranking actual es de $RANKING puntos.
WELCOME_CHANNEL_ID='2983749823749567'
MSG_WELCOME='Welcome, $USUARIO'

INITIAL_ROLE=Gusano

MSG_RATING_SCORE_KEY=$SCORE
MSG_RATING= Tu puntuación actual es de $SCORE
MSG_NEW_RATING= Diste $SCORE a $USUARIO
MSG_RATING_ERR_SHAME_USER=No puedes darte ranting a ti mismo, flipao!
MSG_RATING_ERR_SYNTAX=Te equivocaste en la sintaxis del comando, es: `rate @{usuario} {puntuación(0-5)} {razón(< 256 caracteres)}`
```
## Run docker image
```
docker build -t loki-bot .
docker run -d loki-bot
```
