const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'emojiDelete',
            enabled: true,
            event: 'emojiDelete',
            once: false
        });
    }

    async run(emoji) {
        const settings = emoji.guild.settings.logs;
        if (settings.channel && settings.emojiDelete) {
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('Emoji Deleted! (event: emojiDelete)')
                .setDescription(`**Emoji** → ${emoji.name} (${emoji.id})\n**Emoji Type** → ${emoji.animated ? 'Animated' : 'Normal'}\n**URL** → ${emoji.url}\n**Created At** → ${new Timestamp('LLL').display(emoji.createdTimestamp)}`);
            return this.client.channels.get(settings.channel).send(embed)
        }
    }

    async init() {

    }

};