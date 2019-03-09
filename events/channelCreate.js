const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

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
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('New Channel Created! (event: channelCreate)')
                .setDescription(`${channel.parent ? `**Parent** → ${channel.parent.name}\n` : ''}**Channel** → ${channel.name} (${channel.type == 'text' ? `${channel} ${channel.id}` : channel.id})\n**Channel Type** → ${channel.type}\n**Created At** → ${new Timestamp('LLL').display(channel.createdTimestamp)}`);
            return this.client.channels.get(settings.channel).send(embed)
        }
    }

    async init() {

    }

};