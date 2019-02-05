const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'say',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 10,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: false,
            usage: '<toSay:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...toSay]) {
        await message.delete();
        return message.send(toSay.join(' '));
    }

    async init() {

    }

};