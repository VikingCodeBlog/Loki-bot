const ytdl = require("ytdl-core");
const queue = new Map();

async function execute(message) {
    const serverQueue = queue.get(message.guild.id);
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "¡Necesitas estar en un canal de voz para reproducir música!"
        );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "¡Necesito los permisos para unirme y hablar en su canal de voz!"
        );
    }
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} se ha añadido a la cola!`);
    }
}

function skip(message) {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voice.channel)
        return message.channel.send(
            "¡Tienes que estar en un canal de voz para detener la música!"
        );
    if (!serverQueue)
        return message.channel.send("¡No hay canción que pueda saltarme!");
    serverQueue.connection.dispatcher.end();
}

function stop(message) {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voice.channel)
        return message.channel.send(
            "¡Tienes que estar en un canal de voz para detener la música!"
        );

    if (!serverQueue)
        return message.channel.send("¡No hay canción que pueda detener!");

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Empezó a reproducirse: **${song.title}**`);
}


module.exports = {
    execute,
    play,
    skip,
    stop
  }