const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'respects',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 30,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'A leaderboard of the top 10 users with the most respects paid. (global)',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message) {
        const users = this.client.users.filter(u => u.settings.respects >= 1).sort((a, b) => b.settings.respects - a.settings.respects).map(u => `**${u.tag}** → ${u.settings.respects} respects`);
        if (users.length < 1) return message.send('No respects paid so far.');
        return message.send(`Here's the top 10 users with the most respects paid:\n${users.slice(0, 9).join('\n')}`);
    }

    async init() {

    }

};