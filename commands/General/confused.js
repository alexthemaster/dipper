const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'confused',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 60,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: true,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Confused? Use this command!',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message) {
        return message.send(`Hi. You might be confused as to why I appeared in your server! You might remember me, I'm Sensei, but better! My creator rewrote me from zero, to bring you the best of the best! I'm using a new framework, and I got many optimizations! My commands got improved and my configuration is as flexible as ever! If you find any bugs or have feedback in general use the ${message.content.slice(0, message.prefixLength)}feedback command!`)
    }

    async init() {

    }

};