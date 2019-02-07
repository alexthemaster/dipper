const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'video',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: ['youtube', 'yt'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Search for a video on YouTube!',
            quotedStringSupport: false,
            usage: '<term:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('name', "You must provide a search term!")
    }

    async run(message, [...term]) {
        const config = require('../../data/config.json');

        if (term.join(' ').toLowerCase() === 'mo bamba' || term.join(' ').toLowerCase() === 'mobamba') return message.send(`https://youtu.be/6ONRf7h3Mdk`);
        if (term.join(' ').toLowerCase() === 'sicko mode' || term.join(' ').toLowerCase() === 'sickomode') return message.send(`https://youtu.be/VWoIpDVkOH0`);

        const url = (search, key) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&key=${key}&type=video`;
        let res = await fetch(url(term.join(' '), config.YouTube))
        res = await res.json();

        return message.send(`https://youtu.be/${res.items[0].id.videoId}`);
    }

    async init() {

    }

};