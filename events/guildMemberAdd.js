const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'guildMemberAdd',
            enabled: true,
            event: 'guildMemberAdd',
            once: false
        });
    }

    async run(member) {
        const settings = member.guild.settings.logs;
        if (settings.channel && settings.guildMemberAdd) {
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('New Member! (event: guildMemberAdd)')
                .setDescription(`**Member** → ${member} (${member.user.tag} - ${member.user.id})\n**Joined At** → ${new Timestamp('LLL').display(member.joinedTimestamp)}`);
            return this.client.channels.get(settings.channel).send(embed)
        }
    }

    async init() {

    }

};