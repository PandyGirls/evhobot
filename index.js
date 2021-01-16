const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const token =  process.env.token;


const client = new CommandoClient({
    commandPrefix: '!',
    owner: '485200821857026082',
    invite: 'https://discord.gg/mcS5gWa7'
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'Music')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.server = {
    queue: [],
    currentVideo: {url: "" , title: "Rien pour le moment !"},
    dispatcher: null,
    connection: null
}

client.on('ready', () => {
    console.log(`connecté en tant que ${client.user.tag} - (${client.user.id})`);
});

client.on('error', (error) => console.error(error));

client.login(token);
