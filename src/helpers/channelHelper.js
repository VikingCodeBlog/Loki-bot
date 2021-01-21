function getAnnouncementsChanel(msg) {
  if (process.env.LEVELUPCHANNELID) {
    const channel = msg.client.channels.cache.get(process.env.ANNOUNCECHANNELID);
    return channel || msg.channel;
  }

  return msg.channel;
}

module.exports = {
  getAnnouncementsChanel
}