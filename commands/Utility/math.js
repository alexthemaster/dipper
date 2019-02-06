const { Command } = require('klasa');
const math = require('mathjs');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'math',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: ['calculate'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Do some math!',
            quotedStringSupport: false,
            usage: '<input:string> [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('input', "What should I calculate?")
    }

    async run(message, [...input]) {
        let result = await math.eval(input.join(' '));
        if (!result) return message.send('Something went wrong.');
        return message.send(`Here's your result: \`${result}\``)
    }

    async init() {

    }

};