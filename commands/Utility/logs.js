const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'logs',
            enabled: true,
            runIn: ['text'],
            cooldown: 120,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message) {
        return message.send(`Hello! You can activate the logs by using \`${message.content.slice(0, message.prefixLength)}conf set logs.channel (#channel)\`. You can manually have to deactivate every loggin option, by doing \`${message.content.slice(0, message.prefixLength)}conf set logs.OPTION false\`. You can see all the logging options by doing \`${message.content.slice(0, message.prefixLength)}conf show logs\`! (to re-enable an option do \`${message.content.slice(0, message.prefixLength)}conf reset logs.OPTION\`, which will reset the chosen option to it's default state, enabled)`)
    }

    async init() {

    }

};