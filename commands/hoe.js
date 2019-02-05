const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'hoe',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 120,
            deletable: false,
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
        message.guild.settings.get()
        const display = new RichDisplay(new MessageEmbed().setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ size: 2048 })))
            .addPage(t => t.setDescription("I'm a sick fuck, I like a quick fuck"))
            .addPage(t => t.setDescription("I like my dick sucked, I'll buy you a sick truck"))
            .addPage(t => t.setDescription("I'll buy you some new tits, I'll get you that nip-tuck"))
            .addPage(t => t.setDescription('- Kanye East').setImage('https://cf-images.us-east-1.prod.boltdns.net/v1/static/1125911414/a1fe51d5-9a2d-4c23-8716-aaa28b04aac2/983bee94-8bd0-4760-a23a-11d33d7db6c0/1280x720/match/image.jpg'))
        return display.run(await message.send('Loading...'), { filter: (reaction, user) => { if (!reaction.users.has(message.author)) { return true } else false } });
    }

    async init() {

    }

};