
const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'guildBanRemove',
            enabled: true,
            event: 'guildBanRemove',
            once: false
        });
    }

    async run(guild, user) {
        const settings = guild.settings.logs;
        if (settings.channel && settings.guildBanAdd) {
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('Member Un-Banned! (event: guildBanRemove)')
                .setDescription(`**Member** → ${user} (${user.tag} - ${user.id})\n**Un-Banned At** → ${new Timestamp('LLL').display(new Date())}`);
            return this.client.channels.get(settings.channel).send(embed)
        }
    }

    async init() {

    }

};