const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'choose',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: "I'll choose between two or more things for you!",
            quotedStringSupport: false,
            usage: '<choices:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('choices', "You should give me 2 (or more) things to choose from!")
    }

    async run(message, [...choices]) {
        return choices.length === 1 ? message.send("You only gave me one choice, stoopid.") : message.send(`How about \`${choices[Math.floor(Math.random() * choices.length)]}\`?`)
    }

    async init() {

    }

};