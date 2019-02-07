const { Event, Timestamp } = require('klasa');

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
            return this.client.channels.get(settings.channel).send(`Member Left! (event: guildMemberRemove)\n**Member** → ${member.user.tag} (${member.user.id})\n**Joined At** → ${new Timestamp('LLL').display(member.joinedTimestamp)}\n**Left At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
    }

    async init() {

    }

};