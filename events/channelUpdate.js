const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

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

            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('Channel Edited! (event: channelUpdate)')
                .setDescription(changes.join('\n'));
            return this.client.channels.get(settings.channel).send(embed)
        }
    }

    async init() {

    }

};