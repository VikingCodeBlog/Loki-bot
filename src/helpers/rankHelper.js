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

function increaseUserRankByRating(user, guild, toIncrease) {
    UserRank.findOneAndUpdate({
        userId: `${user.id}-${guild.id}`
    }, {
        $inc: {
            'rank': toIncrease || 1
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

    userRank.save();
}

function getUserRank(member) {
    return UserRank.find({
        userId: `${member.user.id}-${member.guild.id}`
    });
}

function hasToIncreaseRank(rank, msg) {
    const now = new Date();
    const lastUpdate = new Date(rank[0].lastUpdate);
    const isValidTime = (now - lastUpdate) > process.env.INCREASE_RANK_INTERVAL;
    if (!isValidTime) {
        return false;
    }

    const isCorrectInterval = ((rank[0].rank + 1) % process.env.INCREASE_ROLE_BY_RANK_INTERVAL) === 0;
    if (!isCorrectInterval) {
        return false;
    }

    const allowBot = process.env.RANK_BOTS == 'true';
    const allowAdmin = process.env.RANK_ADMINS == 'true';
    const isAdmin = msg.member.hasPermission("ADMINISTRATOR");
    const isBot = msg.author.bot;

    if (!allowBot && isBot) {
        return false;
    }

    if (!allowAdmin && isAdmin) {
        return false;
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
            if (roleHelper.hasToIncreaseRole(rank)) {
                roleHelper.addNextRoleToMember(msg);
                const announcementsChannel = channelHelper.getAnnouncementsChannel(msg);
                const msgLevelUp = process.env.MSG_LEVELUP;
                const userKey = process.env.MSG_USER_KEY;
                const replMsg = msgLevelUp.replace(userKey, msg.author.toString());
                announcementsChannel.send(replMsg);
            }
        }
    });
}

function sendUserRank(msg) {
    getUserRank(msg.member).then((rank) => {
        const msgRank = process.env.MSGRANK.replace(process.env.MSGRANKKWYWORD, rank[0].rank);
        msg.reply(msgRank);
    });
}

module.exports = {
    increaseUserRank,
    increaseUserRankByRating,
    createUserRank,
    getUserRank,
    checkRank,
    sendUserRank
}