const Discord = require('discord.js');
const rankHelper = require('./src/helpers/rankHelper');

//Init discord client
const client = new Discord.Client();

//Init enviroments variables
if (process.env.NODE_ENV !== 'production') {
  console.log("Starting production app")
  require('dotenv').config();
}

//Init mongo database
const db = require('./src/db/index');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }

  if (msg.content.length >= process.env.MINMESSAGELENGTHTORANK) {
    rankHelper.checkRank(msg);
  }
});

client.login(process.env.TOKEN);
