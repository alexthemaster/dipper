const { Event, Timestamp } = require('klasa');

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
            return this.client.channels.get(settings.channel).send(`New Role Created! (event: roleCreate)\n**Created At** → ${new Timestamp('LLL').display(role.createdTimestamp)}\n--------------------`)
        }
    }

    async init() {

    }

};