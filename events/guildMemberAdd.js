const { Event, Timestamp } = require('klasa');

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
            return this.client.channels.get(settings.channel).send(`New Member! (event: guildMemberAdd)\n**Member** → ${member.user.tag} (${member.user.id})\n**Joined At** → ${new Timestamp('LLL').display(member.joinedTimestamp)}\n--------------------`)
        }
    }

    async init() {

    }

};