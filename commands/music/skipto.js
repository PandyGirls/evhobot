const { Command, CommandoMessage, Client } = require("discord.js-commando");
const { UserNotInVoiceChannel, BotNotInVoiceChannel } = require('../../string.json');
const ytdl = require('ytdl-core-discord');


module.exports = class SkiptoCommand extends Command  {
    constructor(client) {
        super(client, {
            name: 'skipto',
            group: 'music',
            memberName: 'skipto',
            description: "Saute à une certaine position dans la file d'attente.",
            args: [
                {
                    key: 'index',
                    prompt: "A quelle position de la file d'attente veux tu te rendre ?",
                    type: 'integer'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message, { index }) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;


        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel)
        }

        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        server.queue.shift();


        index--;


        if (!server.queue[0]) {
            server.currentVideo = {url: "", title: "Rien pour le moment !"}
            return message.say("Ce titre n'a pas était trouver dans la file d'attente");
        }


        server.currentVideo = server.queue[index];
        
        server.connection.play( await ytdl(server.currentVideo.url, {filter: 'audioonly'}), { type: 'opus' } );
        server.queue.splice(index, 1);

        return message.say(":fast_forward: Ignoré :thumbsup:");
    }
}