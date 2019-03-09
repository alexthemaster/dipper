const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

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
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('Channel Deleted! (event: channelDelete)')
                .setDescription(`${channel.parent ? `**Parent** → ${channel.parent.name}\n` : ''}**Channel** → ${channel.name} (${channel.id})\n**Channel Type** → ${channel.type}\n**Created At** → ${new Timestamp('LLL').display(channel.createdTimestamp)}\n**Deleted At** → ${new Timestamp('LLL').display(new Date())}`);
            return this.client.channels.get(settings.channel).send(embed)
        }
    }

    async init() {

    }

};