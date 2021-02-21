const UserRank = require('../db/models/userRank')
const UserRating = require('../db/models/userRating')

function getMsgEmbed(weklyUsers, guild, msgEmbed) {
    const imagelist = [
        'https://media.giphy.com/media/Sk3KytuxDQJQ4/giphy.gif',
        'https://media.giphy.com/media/2juvZoQ3oLa4U/giphy.gif',
        'https://media.giphy.com/media/AhjXalGPAfJg4/giphy.gif',
        'https://media.giphy.com/media/PvvSfSDFoAL5e/giphy.gif',
        'https://media.giphy.com/media/KpACNEh8jXK2Q/giphy.gif',
        'https://media.giphy.com/media/heIX5HfWgEYlW/giphy.gif',
        'https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif',
        'https://media.giphy.com/media/hOzfvZynn9AK4/giphy.gif',
        'https://media.giphy.com/media/cA2S6jVVUg5X2/giphy.gif',
        'https://media.giphy.com/media/cg5FwpvDmhIcM/giphy.gif',
        'https://media.giphy.com/media/BemKqR9RDK4V2/giphy.gif',
        'https://media.giphy.com/media/7srpeY4TZMrO8/giphy.gif',
        'https://media.giphy.com/media/3oriO7A7bt1wsEP4cw/giphy.gif',
        'https://media.giphy.com/media/13rQ7rrTrvZXlm/giphy.gif',
        'https://media.giphy.com/media/xUOwGfFOBuv547b06Q/giphy.gif',
        'https://media.giphy.com/media/uWv3uPfWOz088/giphy.gif'
    ];
    const random = Math.floor(Math.random() * imagelist.length);
    msgEmbed
        .setColor('#0099ff')
        .setTitle('Estadísticas de la semana')
        .setURL('https://www.instagram.com/vikingcodeblog/')
        .setAuthor('lokiforvikings', 'https://camo.githubusercontent.com/bd09d3bec45a5453669e55fef1a4d6bca16ad1caf584aba8764df20e83a2c9e2/68747470733a2f2f692e696d6775722e636f6d2f516957787673342e706e67', 'https://www.instagram.com/vikingcodeblog/')
        .setDescription('<@&803371299735994388> Estos son los vikingos que están más activos en Discord (Solo aparecen en el ranking los usuarios que han participado esta semana)')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/axe_1fa93.png')
        .setImage(imagelist[random])
        .setTimestamp()

    for (let index = 0; index < weklyUsers.length; index++) {
        const user = weklyUsers[index];
        const sum = user.ratings.reduce((a, b) => parseInt(a) + parseInt(b.rating), 0);
        const avg = (sum / user.ratings.length) || 0;
        const guidUser = guild.members.cache.find(member => member.id === user.userId.split('-')[0]).user;
        msgEmbed.addField('👨‍💻Usuario', `<@${guidUser.id}>`, true)
        msgEmbed.addField('🎓Rank', user.rank, true)
        msgEmbed.addField('⭐Rating', '⭐'.repeat(parseInt(avg) || 1), true)
    }

    return msgEmbed;
}

async function getWeklyUserRanks(guild, msgEmbed) {
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    weklyUsers = await UserRank.aggregate([
        { $match: { userId: { $regex: `-${guild.id}`, $options: "i" }, lastUpdate: { $gte: cutoff } } },
        {
            $lookup: {
                from: UserRating.collection.name,
                localField: 'userId',
                foreignField: 'userId',
                as: 'ratings'
            }
        }
    ]).exec();
    return getMsgEmbed(weklyUsers, guild, msgEmbed);
}

module.exports = {
    getWeklyUserRanks
}