const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'emojiCreate',
            enabled: true,
            event: 'emojiCreate',
            once: false
        });
    }

    async run(emoji) {
        const settings = emoji.guild.settings.logs;
        if (settings.channel && settings.emojiCreate) {
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('New Emoji Created! (event: emojiCreate)')
                .setDescription(`**Emoji** → ${emoji.name} (${emoji.id})\n**Emoji Type** → ${emoji.animated ? 'Animated' : 'Normal'}\n**URL** → ${emoji.url}\n**Created At** → ${new Timestamp('LLL').display(emoji.createdTimestamp)}`);
            return this.client.channels.get(settings.channel).send(embed)
        }
    }

    async init() {

    }

};