
const { Event, Timestamp } = require('klasa');

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
            return this.client.channels.get(settings.channel).send(`Member Un-Banned! (event: guildBanRemove)\n**Member** → ${user.tag} (${user.id})\n**Un-Banned At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
    }

    async init() {

    }

};