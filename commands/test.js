const { Command } = require('klasa');
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'test',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
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
        let bg = await fetch('https://images.unsplash.com/photo-1551478228-253d5bd44caf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format');
        bg = await bg.buffer();

        let avatar = await fetch(message.author.displayAvatarURL({format: 'png', size: 2048}));
        avatar = await avatar.buffer();

        const canvas = new Canvas(800, 600)
        .addImage(bg, 0, 0, 800, 600)
        .addRoundImage(avatar, 293, 193, 215, 215, 100)
        .addText('suck my dick', 293, 476, 300)
        .toBuffer();

        return message.send('', {files: [{attachment: canvas, name: 'file.png'}]})
    }

    async init() {

    }

};