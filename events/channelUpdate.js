const { Event, Timestamp } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'channelUpdate',
            enabled: true,
            event: 'channelUpdate',
            once: false
        });
    }

    async run(oChannel, nChannel) {
        const settings = oChannel.guild.settings.logs;
        if (settings.channel && settings.channelUpdate) {
            const changes = [];
            if (oChannel.name !== nChannel.name) changes.push(`Action: Name Changed\n**Old Name** → ${oChannel.name}\n**New Name** → ${nChannel.name}`);
            if (oChannel.parent !== nChannel.parent) changes.push(`Action: Parent Changed\n**Old Parent** → ${oChannel.parent ? oChannel.parent.name : 'No Parent'}\n**New Parent** → ${nChannel.parent ? nChannel.parent.name : 'No Parent'}`);
            if (changes.length < 1) return;
            return this.client.channels.get(settings.channel).send(`Channel Edited! (event: channelUpdate)\n${changes.join('\n')}\n--------------------`)
        }
    }

    async init() {

    }

};