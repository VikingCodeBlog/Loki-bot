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

## SetUp your enviroment variables
First of all, you need to create a bot in [https://discord.com/developers](https://discord.com/developers)
Create a .env file in your project.
- TOKEN: Is the bot token you can find in https://discord.com/developers/applications/{YourBot}/bot
- MAXROLENAME: The maximum role that the bot can promote a user.
- MONGOURI: Your mongo database
- INCREASERANKINTERVAL: The time between messages that will be valued to rank up to users.
- INCREASEROLEBYRANKINTERVAL: How often will a user be promoted
- MINMESSAGELENGTHTORANK: Minimum length of comments for loki-bot to take them into account

Example .env file:
```
TOKEN='asdkjfgldjfg'
MAXROLENAME=rol3
MONGOURI='mongodb+srv://user:pass@rute/loki?retryWrites=true&w=majority'
INCREASERANKINTERVAL=300000
INCREASEROLEBYRANKINTERVAL=10
MINMESSAGELENGTHTORANK=5
```
