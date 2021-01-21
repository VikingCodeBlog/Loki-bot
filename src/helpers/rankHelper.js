const UserRank = require('../db/models/userRank')
const roleHelper = require('./roleHelper')
const channelHelper = require('./channelHelper')

function increaseUserRank(member) {
  UserRank.findOneAndUpdate({
    userId: `${member.user.id}-${member.guild.id}`
  }, {
    $inc: {
      'rank': 1
    },
    lastUpdate: new Date()
  }).exec();
}

function createUserRank(member, rank) {
  const userRank = new UserRank({
    userId: `${member.user.id}-${member.guild.id}`,
    rank: rank,
    lastUpdate: new Date()
  });

  userRank.save()
}

function getUserRank(member) {
  return UserRank.find({
    userId: `${member.user.id}-${member.guild.id}`
  })
}

function hasToIncreaseRank(rank, msg) {
  const now = new Date();
  const lastUpdate = new Date(rank[0].lastUpdate);
  const isValidTime = (now - lastUpdate) > process.env.INCREASERANKINTERVAL;
  if (!isValidTime) {
    return false;
  }

  const isCorrectInterval = ((rank[0].rank + 1) % process.env.INCREASEROLEBYRANKINTERVAL) === 0;
  if (!isCorrectInterval) {
    return false
  }

  const allowBot = process.env.RANKADMINS == 'true';
  const allowAdmin = process.env.RANKADMINS == 'true';
  const isAdmin = msg.member.hasPermission("ADMINISTRATOR") ;
  const isBot = msg.author.bot;

  if (allowAdmin && !allowBot) {
    return !isBot;
  }

  if (!allowAdmin && allowBot) {
    return !isAdmin;
  }

  if (!allowAdmin && !allowBot) {
    return !isAdmin && !isBot;
  }

  return true;
}

function checkRank(msg) {
  getUserRank(msg.member).then((rank) => {
    const hadRank = rank && rank.length;
    if (!hadRank) {
      createUserRank(msg.member, 0);
      return;
    }

    if (hasToIncreaseRank(rank, msg)) {
      increaseUserRank(msg.member);
      roleHelper.addNewRole(msg);
      const announcementsChannel = channelHelper.getAnnouncementsChanel(msg);
      const msgLevelUp = process.env.MSGLEVELUP;
      const userKey = process.env.MSGUSERKEYWORD;
      const replMsg = msgLevelUp.replace(userKey, msg.author.toString());
      announcementsChannel.send(replMsg);
    }
  });
}

module.exports = {
  increaseUserRank,
  createUserRank,
  getUserRank,
  checkRank
}