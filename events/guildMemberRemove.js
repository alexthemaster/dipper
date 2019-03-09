const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'guildMemberRemove',
            enabled: true,
            event: 'guildMemberRemove',
            once: false
        });
    }

    async run(member) {
        const settings = member.guild.settings.logs;
        if (settings.channel && settings.guildMemberRemove) {
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('Member Left! (event: guildMemberRemove)')
                .setDescription(`**Member** → ${member} (${member.user.tag} - ${member.user.id})\n**Joined At** → ${new Timestamp('LLL').display(member.joinedTimestamp)}\n**Left At** → ${new Timestamp('LLL').display(new Date())}`);
            return this.client.channels.get(settings.channel).send(embed)
        }
    }

    async init() {

    }

};