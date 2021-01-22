function getAnnouncementsChannel(msg) {
  if (process.env.ANNOUNCELEVELCHANNELID) {
    const channel = msg.client.channels.cache.get(process.env.ANNOUNCELEVELCHANNELID);
    return channel || msg.channel;
  }

  return msg.channel;
}

function getWelcomeChannel(member) {
  if (process.env.WELCOMECHANNELID) {
    const channel = member.guild.channels.cache.get(process.env.WELCOMECHANNELID);
    return channel || member.channel;
  }

  return msg.channel;
}

module.exports = {
  getAnnouncementsChannel,
  getWelcomeChannel
}