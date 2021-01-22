function getAnnouncementsChannel(msg) {
  if (process.env.ANNOUNCE_ROLE_CHANNEL_ID) {
    const channel = msg.client.channels.cache.get(process.env.ANNOUNCE_ROLE_CHANNEL_ID);
    return channel || msg.channel;
  }

  return msg.channel;
}

function getWelcomeChannel(member) {
  if (process.env.WELCOME_CHANNEL_ID) {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
    return channel || member.channel;
  }

  return msg.channel;
}

module.exports = {
  getAnnouncementsChannel,
  getWelcomeChannel
}