const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'roleCreate',
            enabled: true,
            event: 'roleCreate',
            once: false
        });
    }

    async run(role) {
        const settings = role.guild.settings.logs;
        if (settings.channel && settings.roleCreate) {
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('New Role Created! (event: roleCreate)')
                .setDescription(`**Created At** → ${new Timestamp('LLL').display(role.createdTimestamp)}`);
            return this.client.channels.get(settings.channel).send(embed);
        }
    }

    async init() {

    }

};