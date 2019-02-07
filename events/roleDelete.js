const { Event, Timestamp } = require('klasa');

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
            return this.client.channels.get(settings.channel).send(`Role Deleted! (event: roleDelete)\n**Role** → ${role.name} (${role.id})\n**Hex Color** → ${role.hexColor}\n**Created At** → ${new Timestamp('LLL').display(role.createdTimestamp)}\n**Deleted At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
    }

    async init() {

    }

};