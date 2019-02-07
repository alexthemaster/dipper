const { Event, Timestamp } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'guildBanAdd',
            enabled: true,
            event: 'guildBanAdd',
            once: false
        });
    }

    async run(guild, user) {
        const settings = guild.settings.logs;
        if (settings.channel && settings.guildBanAdd) {
            return this.client.channels.get(settings.channel).send(`New Member Banned! (event: guildBanAdd)\n**Member** → ${user.tag} (${user.id})\n**Banned At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
    }

    async init() {

    }

};