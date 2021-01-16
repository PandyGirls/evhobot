const { Command, CommandoMessage, Client } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel } = require('../../string.json');
const ytdl = require('ytdl-core-discord');


module.exports = class SkipCommand extends Command  {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: "Ajoute le bot sur votre canal vocal."
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;


        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel)
        }

        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        server.queue.shift();

        if (!server.queue[0]) {
            server.currentVideo = {url: "", title: "Rien pour le moment !"}
            return message.say("Il n'y a rien dans la file d'attente");
        }

        server.currentVideo = server.queue[0];
        server.connection.play( await ytdl(server.currentVideo.url, {filter: 'audioonly'}), { type: 'opus' } );
        server.queue.shift();

        return message.say(":fast_forward: Ignoré :thumbsup:");
    }
}