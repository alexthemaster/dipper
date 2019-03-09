const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'purge',
            enabled: true,
            runIn: ['text'],
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
            description: 'Purge a given number of messages!',
            quotedStringSupport: false,
            usage: '<messages:number{1,100}>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('messages', "Please specify a number between 1 and 100 (of messages) you want deleted!")
    }

    async run(message, [messages]) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) throw "You don't have permission to do this.";
        message.channel.bulkDelete(messages, true).then(msgs => {
            return message.send(`Successfully purged ${msgs.size} messages!`);
        }).catch(err => {
            return message.send(`An error occurred while performing this action.`);
        })
    }

    async init() {

    }

};