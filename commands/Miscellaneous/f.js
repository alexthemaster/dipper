const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'f',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: ['respect'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Pay some respects.',
            quotedStringSupport: false,
            usage: '[payRespectsTo:string] [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...payRespectsTo]) {
        await message.author.settings.update('respects', message.author.settings.get('respects') + 1);

        if (!payRespectsTo.join(' ') || payRespectsTo.join(' ').length < 1) return message.send(`**${message.member.displayName}** has paid their respects 💕`)

        if (payRespectsTo.join(' ').toLowerCase().includes('@everyone') || payRespectsTo.join(' ').toLowerCase().includes('@here')) return message.reply('Just don\'t.');
        
        message.send(`**${message.member.displayName}** has paid their respects for **${payRespectsTo.join(' ')}** 💕`)
    }

    async init() {

    }

};