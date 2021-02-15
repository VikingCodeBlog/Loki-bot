const UserRating = require('../db/models/userRating');

const rateUser = async (msg) => {
  const parsedContent = msg.content.split(' ').filter((fragment) => !!fragment);

  const user = msg.mentions.users.first();

  const rating = parseInt(parsedContent[2]);
  const validRating = rating && rating >= 0 && rating <= 5;

  const reason = parsedContent[3];

  if (!user || user.id === msg.author.id || !rating || !validRating || !reason)
    return msg.reply(
      'te equivocaste en la sintaxis del comando, es: `rate @{usuario} {puntuación(0-5)} {razón(< 256 caracteres)}`'
    );

  let userRating = await UserRating.findOne({
    userId: user.id,
    byUserId: msg.author.id,
  });

  if (userRating)
    userRating = await UserRating.findByIdAndUpdate(userRating._id, {
      rating,
      reason,
    });
  else
    userRating = await UserRating.create({
      userId: user.id,
      byUserId: msg.author.id,
      rating,
      reason,
    });

  console.log(userRating);

  msg.reply(`diste  ${'⭐'.repeat(rating)}  a ${user.username}`);
};

const sendUserRating = async (msg) => {
  const userRating = await UserRating.aggregate([
    { $match: { userId: msg.author.id } },
    { $group: { _id: '$userId', avgRating: { $avg: '$rating' } } },
  ]);

  const avgRating = userRating[0]?.avgRating || 0;

  msg.reply(
    `Tu puntuación actual es de **${avgRating.toFixed(3)}** ${'⭐'.repeat(
      avgRating
    )}`
  );
};

module.exports = { rateUser, sendUserRating };
