const { Event, Timestamp } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'channelDelete',
            enabled: true,
            event: 'channelDelete',
            once: false
        });
    }

    async run(channel) {
        const settings = channel.guild.settings.logs;
        if (settings.channel && settings.channelDelete) {
            return this.client.channels.get(settings.channel).send(`Channel Deleted! (event: channelDelete)\n${channel.parent ? `**Parent** → ${channel.parent.name}\n` : ''}**Channel** → ${channel.name} (${channel.id})\n**Channel Type** → ${channel.type}\n**Created At** → ${new Timestamp('LLL').display(channel.createdTimestamp)}\n**Deleted At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
    }

    async init() {

    }

};