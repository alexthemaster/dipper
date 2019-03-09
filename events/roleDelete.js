const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'roleDelete',
            enabled: true,
            event: 'roleDelete',
            once: false
        });
    }

    async run(role) {
        const settings = role.guild.settings.logs;
        if (settings.channel && settings.roleDelete) {
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('Role Deleted! (event: roleDelete)')
                .setDescription(`**Role** → ${role.name} (${role.id})\n**Hex Color** → ${role.hexColor}\n**Created At** → ${new Timestamp('LLL').display(role.createdTimestamp)}\n**Deleted At** → ${new Timestamp('LLL').display(new Date())}`);
            return this.client.channels.get(settings.channel).send(embed);
        }
    }

    async init() {

    }

};