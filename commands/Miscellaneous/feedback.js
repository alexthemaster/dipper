const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'feedback',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 300,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: true,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Find bugs? Want to tell something to the developer? Use this command!',
            quotedStringSupport: false,
            usage: '<feedback:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('feedback', "Is this what you want to submit as feedback? Nothing? :(")
    }

    async run(message, [...feedback]) {
        message.send("Alright! I'll let my developer know :)")
        return this.client.users.get(this.client.options.ownerID).send(`New Feedback!\n**From** → ${message.author.tag} (${message.author.id})\n**Feedback** → ${feedback.join(' ')}`)
    }

    async init() {

    }

};