const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: '8ball',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: ['ask', 'question'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: "Got a question? Ask it and I'll reply!",
            quotedStringSupport: false,
            usage: '<question:reg/(\\w{1,})\\?/i>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('question', "This doesn't look like a question to me!")

        this.choices = ['Yes',
            'No',
            'Maybe',
            'Definitely',
            'Of course',
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Signs point to yes',
            'Reply hazy try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            'Don\'t count on it',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful']
    }

    async run(message) {
        return message.send(`My answer is: \`${this.choices[Math.floor(Math.random() * this.choices.length)]}\``)
    }

    async init() {

    }

};