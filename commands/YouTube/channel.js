const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'channel',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: false,
            usage: '<term:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('name', "You must provide a search term!")
    }

    async run(message, [...term]) {
        const config = require('../../data/config.json');
        const url = (search, key) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&key=${key}&type=channel`;
        let res = await fetch(url(term.join(' '), config.YouTube))
        res = await res.json();

        return message.send(`https://youtube.com/channel/${res.items[0].id.channelId}`);
    }

    async init() {

    }

};