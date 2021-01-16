const { MessageEmbed } = require("discord.js");
const { Command, CommandoMessage, Client } = require("discord.js-commando");
const { BotNotInVoiceChannel  } = require('../../string.json');

module.exports = class QueueCommand extends Command  {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: "Affiche la file d'attente. Pour afficher différentes pages, tapes la commande avec le numéro de la page spécifié après (queue 2)",
            args: [
                {
                    key: 'page',
                    prompt: "Quel page veux-tu afficher ?",
                    default: 1,
                    type: 'integer'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {Number} page 
     */
    async run(message, { page }) {
      const server = message.client.server;

      if (!message.client.voice.connections.first()) {
          return message.say(BotNotInVoiceChannel);
      }

      
      const numberOfItems = 10;
      const startingItem = (page - 1) * numberOfItems;
      const queueLength = server.queue.length;

      var itemsPerPage = startingItem + numberOfItems;
      var totalPages = 1;

      var embed = new MessageEmbed()
            .setTitle(`File d'attente pour ${message.author.username}`)
         .setColor("PURPLE")
         .addField('En train de jouer :', server.currentVideo.url);

        if (queueLength > 0) {
            var value = "";

            if (queueLength > numberOfItems) {
                totalPages = Math.ceil(queueLength / numberOfItems);
            }

            if (page < 0 || (page) > totalPages) {
                return message.say(":x: Cette page n'existe pas.");
            }

            if (( queueLength - startingItem) < numberOfItems) {
                itemsPerPage = (queueLength - startingItem) + startingItem;
            }

            for (let i = startingItem; i < itemsPerPage; i++) {
                const video = server.queue[i];
                value += "`" + (i + 1) + ".` " + video.url + "\n";
            }
            embed.addField("A venir :", value);
        }
        embed.setFooter(`Page ${page}/${totalPages}`);

        return message.say(embed);
    }
}