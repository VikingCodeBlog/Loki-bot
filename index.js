const Discord = require('discord.js');
const rankHelper = require('./src/helpers/rankHelper');

//Init discord client
const client = new Discord.Client();

//Init enviroments variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} else {
  console.log("Starting production app")
}
console.log(process.env.MONGOURI)
//Init mongo database
const db = require('./src/db/index');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
  if(msg.member.hasPermission("ADMINISTRATOR")){
    console.log("Is admin INDEx");
  }else{
    console.log("Is not admin el pana");
  }
  if (msg.content.length >= process.env.MINMESSAGELENGTHTORANK) {
    rankHelper.checkRank(msg);
  }
});

client.login(process.env.TOKEN);