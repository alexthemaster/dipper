const { Event, Timestamp } = require('klasa');

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
            return this.client.channels.get(settings.channel).send(`Emoji Deleted! (event: emojiDelete)\n**Emoji** → ${emoji.name} (${emoji.id})\n**Emoji Type** → ${emoji.animated ? 'Animated' : 'Normal'}\n**URL** → ${emoji.url}\n**Created At** → ${new Timestamp('LLL').display(emoji.createdTimestamp)}\n--------------------`)
        }
    }

    async init() {

    }

};