function getAnnouncementsChanel(msg) {
  if (process.env.ANNOUNCELEVELCHANNELID) {
    const channel = msg.client.channels.cache.get(process.env.ANNOUNCELEVELCHANNELID);
    return channel || msg.channel;
  }

  return msg.channel;
}

module.exports = {
  getAnnouncementsChanel
}