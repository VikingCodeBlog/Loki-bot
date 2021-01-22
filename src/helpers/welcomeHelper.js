const channelHelper = require('./channelHelper');

function sendWelcome(member) {
  const welcomeMsg = process.env.MSGWELCOME.replace(process.env.MSGUSERKEYWORD, member.user.toString())
  channelHelper.getWelcomeChannel(member).send(welcomeMsg); 
}

module.exports = {
  sendWelcome
}
