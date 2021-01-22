const channelHelper = require('./channelHelper');

function sendWelcome(member) {
  const welcomeMsg = process.env.MSG_WELCOME.replace(process.env.MSG_USER_KEY, member.user.toString())
  channelHelper.getWelcomeChannel(member).send(welcomeMsg); 
}

module.exports = {
  sendWelcome
}
