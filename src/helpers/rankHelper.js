const UserRank = require('../db/models/userRank')
const roleHelper = require('./roleHelper')

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

function checkRank(msg) {
  const now = new Date();
  getUserRank(msg.member).then((rank) => {
    if (rank && rank.length) {
      const lastUpdate = new Date(rank[0].lastUpdate);
      const isValidTime = (now - lastUpdate) > process.env.INCREASERANKINTERVAL;
      if (isValidTime) {
        increaseUserRank(msg.member);

        const isValidRank = ((rank[0].rank + 1) % process.env.INCREASEROLEBYRANKINTERVAL) === 0;
        if (isValidRank) {

          //Comprueba si el usuario que envió el mensaje tiene permisos de administrador
          if (!msg.member.hasPermission("ADMINISTRATOR")) {
            console.log("Is not admin");
            //Comprueba si el autor del mensaje es un bot
            if (msg.author.bot) return;

            //Check if announce channel is defined
            if (!process.env.LEVELUPCHANNELID) {
              
              const messageAuthor = msg.author;
              //Le avisa al usuario que subio de nivel en un canal especifico
              msg.channel.send(`GG, ${messageAuthor.toString()} has subido de Nivel! `);
              roleHelper.addNewRole(msg);
              console.info("Announce channel is not defined");

            } else {
              //Le avisa al usuario que subio de nivel en un canal especifico
              const messageAuthor = msg.author;
              const announcementsChannel = msg.client.channels.cache.get(process.env.ANNOUNCECHANNELID);
              announcementsChannel.send(`GG, ${messageAuthor.toString()} has subido de Nivel! `);
              roleHelper.addNewRole(msg);
            }

          } else {
            console.info(`${msg.author.toString()} is admin`);
          }


        }
      }
    } else {
      console.log('create')
      createUserRank(msg.member, 0);
    }
  });
}

module.exports = {
  increaseUserRank,
  createUserRank,
  getUserRank,
  checkRank
}