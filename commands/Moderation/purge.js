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
            usage: '[member:member] <messages:number{1,100}>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('messages', "Please specify a number between 1 and 100 (of messages) you want deleted!")
    }

    async run(message, [member, messages]) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) throw "You don't have permission to do this.";
        let msgs;
        if (member) {
            msgs = await message.channel.messages.fetch();
            msgs = msgs.filter(msg => msg.author.id === member.user.id).first(messages);
        }
        message.channel.bulkDelete(msgs ? msgs : messages, true).then(async msgsPurged => {
            let m = await message.send(`Successfully purged ${msgsPurged.size} messages${member ? ` from ${member.user.tag}` : ''}!`);
            setTimeout(() => {
                m.delete();
            }, 5000);
        }).catch(err => {
            return message.send(`An error occurred while performing this action.`);
        })
    }

    async init() {

    }

};