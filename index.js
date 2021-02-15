const Discord = require('discord.js');
const rankHelper = require('./src/helpers/rankHelper');
const ratingsHelper = require('./src/helpers/ratingsHelper');
const welcomeHelper = require('./src/helpers/welcomeHelper');
const roleHelper = require('./src/helpers/roleHelper');

//Init discord client
const client = new Discord.Client();

//Init enviroments variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} else {
  console.log("Starting production app")
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

  if (msg.content === 'rank') {
    rankHelper.sendUserRank(msg);
  }

  if (msg.content.length >= process.env.MIN_MESSAGE_LENGTH_TO_RANK) {
    rankHelper.checkRank(msg);
  }

  if (msg.content.startsWith('rate')) {
    ratingsHelper.rateUser(msg);
  }

  if (msg.content === 'rating') {
    ratingsHelper.sendUserRating(msg);
  }
});

client.on('guildMemberAdd', member => {
  roleHelper.addInitialRole(member);
  welcomeHelper.sendWelcome(member);
});

client.login(process.env.TOKEN);
