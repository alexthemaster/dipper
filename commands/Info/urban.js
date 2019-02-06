const { Command, RichDisplay, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'urban',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: ['ud'],
            guarded: false,
            nsfw: true,
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS"],
            requiredSettings: [],
            subcommands: false,
            description: 'Search for a given term on Urban Dictionary!',
            quotedStringSupport: false,
            usage: '<term:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('term', "Please define a term to search for!")
    }

    async run(message, [...term]) {
        const base_url = (term) => `http://api.urbandictionary.com/v0/define?term=${term}`;

        let res = await fetch(base_url(term.join(' ')))
        res = await res.json();
        if (!res.list[0]) return message.send(`Sorry but I couldn't find anything on Urban Dictionary for: ${toSearch}`);
        
        const display = new RichDisplay(new MessageEmbed().setColor('#e4f714').setAuthor('Urban Dictionary Search', 'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-01-11/297387706245_85899a44216ce1604c93_512.jpg'));

        res.list.forEach(t => {
            display.addPage(p => p.setDescription(`**Word** → ${t.word}\n**Definition** → ${t.definition}\n**Example** → ${t.example}\n**Likes** → ${t.thumbs_up}\n**Dislikes** → ${t.thumbs_down}\n**Written On** → ${new Timestamp('LLL').display(t.written_on)}`))
        })

        return display.run(await message.send("Loading..."), { filter: (reaction, user) => user.id === message.author.id })
    }

    async init() {

    }

};