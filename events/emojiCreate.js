const { Event, Timestamp } = require('klasa');

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
            return this.client.channels.get(settings.channel).send(`New Emoji Created! (event: emojiCreate)\n**Emoji** → ${emoji.name} (${emoji.id})\n**Emoji Type** → ${emoji.animated ? 'Animated' : 'Normal'}\n**URL** → ${emoji.url}\n**Created At** → ${new Timestamp('LLL').display(emoji.createdTimestamp)}\n--------------------`)
        }
    }

    async init() {

    }

};