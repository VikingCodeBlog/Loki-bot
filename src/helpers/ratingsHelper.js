const UserRating = require('../db/models/userRating');
const rankHelper = require('../helpers/rankHelper');

const rateUser = async(msg) => {
    const parsedContent = msg.content.split(' ').filter((fragment) => !!fragment);
    const user = msg.mentions.users.first();

    const rating = parseInt(parsedContent[2]);
    const validRating = rating && rating >= 0 && rating <= 5;
    const reason = parsedContent.slice(3, parsedContent.length).join(' ');
    if (user && user.id === msg.author.id) {
        return msg.reply(process.env.MSG_RATING_ERR_SHAME_USER);
    }

    if (!user || !rating || !validRating || !reason) {
        return msg.reply(process.env.MSG_RATING_ERR_SYNTAX);
    }

    await UserRating.create({
        userId: `${user.id}-${msg.guild.id}`,
        byUserId: msg.author.id,
        rating,
        reason,
    });

    rankHelper.increaseUserRankByRating(user, msg.guild, rating);
    msg.reply(
        process.env.MSG_NEW_RATING
        .replace(process.env.MSG_RATING_SCORE_KEY, `${'⭐'.repeat(rating)}`)
        .replace(process.env.MSG_USER_KEY, `${user.username}`)
    );
};

const sendUserRating = async(msg) => {
    const aggregate = [
        { $match: { userId: `${msg.author.id}-${msg.guild.id}` } },
        { $group: { _id: '$userId', avgRating: { $avg: '$rating' } } },
    ];

    const userRating = await UserRating.aggregate(aggregate);

    const avgRating = userRating[0] ? userRating[0].avgRating : 0;

    msg.reply(
        process.env.MSG_RATING.replace(process.env.MSG_RATING_SCORE_KEY, `**${avgRating.toFixed(3)}** ${'⭐'.repeat(
            avgRating
          )}`)
    );
};

module.exports = { rateUser, sendUserRating };