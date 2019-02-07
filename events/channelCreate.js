const { Event, Timestamp } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'channelCreate',
            enabled: true,
            event: 'channelCreate',
            once: false
        });
    }

    async run(channel) {
        const settings = channel.guild.settings.logs;
        if (settings.channel && settings.channelCreate) {
            return this.client.channels.get(settings.channel).send(`New Channel Created! (event: channelCreate)\n${channel.parent ? `**Parent** → ${channel.parent.name}\n` : ''}**Channel** → ${channel.name} (${channel.type == 'text' ? `${channel} ${channel.id}` : channel.id})\n**Channel Type** → ${channel.type}\n**Created At** → ${new Timestamp('LLL').display(channel.createdTimestamp)}\n--------------------`)
        }
    }

    async init() {

    }

};