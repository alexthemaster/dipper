const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const translate = require('google-translate-api');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'translate',
            enabled: false,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS"],
            requiredSettings: [],
            subcommands: false,
            description: 'Translate text to any given language.',
            quotedStringSupport: false,
            usage: '<language:string> <text:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('language', "You must privide a language to translate the text to!");
        this.customizeResponse('text', "You must provide some text to translate!");
    }

    async run(message, [language, ...text]) {
        translate(text.join(' '), { to: language }).then(res => {
            if (!res) return message.send('Something went wrong.');

            const embed = new MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setFooter('Google Text Translation', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google-favicon-2015.png/150px-Google-favicon-2015.png')
                .setDescription(`Translated from: ${res.from.language.iso}\nTranslate to: ${language.toLowerCase()}\n\nOriginal Text: ${text.join(' ')}\nTranslated text: ${res.text}`)
            return message.send(embed)
        }).catch(err => {
            return message.send(`Something went wrong: ${err}`)
        })
    }

    async init() {

    }

};