const Discord = require('discord.js');
const rankHelper = require('./src/helpers/rankHelper');
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
const prefix = process.env.COMMAND_PREFIX;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  if (command === 'ping') {
    msg.reply('pong')
  }

  if (command === 'rank') {
    rankHelper.sendUserRank(msg);
  }

  if (msg.content.length >= process.env.MIN_MESSAGE_LENGTH_TO_RANK) {
    rankHelper.checkRank(msg);
  }
});

client.on('guildMemberAdd', member => {
  roleHelper.addInitialRole(member);
  welcomeHelper.sendWelcome(member);
});

client.login(process.env.TOKEN);