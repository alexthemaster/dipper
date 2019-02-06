const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'reverse',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: ['inverse'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Reverse text.',
            quotedStringSupport: false,
            usage: '<text:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('text', "Please provide your desired text.")
    }

    async run(message, [...text]) {
        const reversed = text.join(' ').split('').reverse().join('');
        return message.send(`\`${reversed}\``)
    }

    async init() {

    }

};