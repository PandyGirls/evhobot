const { Command, CommandoMessage, Client } = require("discord.js-commando");
const { StreamDispatcher } = require('discord.js');
const { UserNotInVoiceChannel,BotNotInVoiceChannel  } = require('../../string.json');

module.exports = class ResumeCommand extends Command  {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: "Reprendre la musique qui est actuellement en pause.",
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} query 
     */
    async run(message) {
        /**
         * @type StreamDispatcher
         */
        const dispatcher = message.client.server.dispatcher;

        if (!message.member.voice.channel) {
            return message.say(UserNotInVoiceChannel)
        }

        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }
        
        if (dispatcher) {
            dispatcher.resume();
        }

        return message.say("En train de jouer :notes:")
    }
}