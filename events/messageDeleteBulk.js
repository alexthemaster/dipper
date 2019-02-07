const { Event, Timestamp } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'messageDeleteBulk',
            enabled: true,
            event: 'messageDeleteBulk',
            once: false
        });
    }

    async run(messages) {
        const settings = messages.first().guild.settings.logs;
        if (settings.channel && settings.messageDeleteBulk) {
            return this.client.channels.get(settings.channel).send(`Multiple Messages Deleted! (event: messageDeleteBulk)\n**Messages Deleted** → ${messages.size}\n**Deleted At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
    }

    async init() {

    }

};