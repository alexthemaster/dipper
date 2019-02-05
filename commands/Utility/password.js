const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'password',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 10,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Want to generate a shiny password? You can do so with this command!',
            quotedStringSupport: false,
            usage: '<length:number{,1960}>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('length', "I can't generate passwords longer than 1960 characters, due to Discord message limitations.")
    }

    async run(message, [length = 10]) {
        if (message.channel.type === 'text') message.send('Check your DM!');
        return message.author.send(`Here's your new shiny password: \`${this.generatePassword(length)}\``);
    }

    generatePassword(length) {
        const choices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz?!@#$%^&*_-=0123456789'.split('');
        let final = '';
        for (let i = 0; i < length; i++) {
            final += choices[Math.floor(Math.random() * choices.length)];
        }
        return final;
    }

    async init() {

    }

};