const { Event, Timestamp } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'messageUpdate',
            enabled: true,
            event: 'messageUpdate',
            once: false
        });
    }

    async run(oMessage, nMessage) {
        const settings = oMessage.guild.settings.logs;
        if (settings.channel && settings.messageUpdate) {
            if (oMessage.content === nMessage.content) return;
            return this.client.channels.get(settings.channel).send(`Message Updated! (event: messageUpdate)\n**Author** → ${oMessage.author.tag} (${oMessage.author.id})\n**Old Message Content** → \`${oMessage.cleanContent}\`\n**New Message Content** → \`${nMessage.cleanContent}\`\n**Channel** → ${oMessage.channel.name} (${oMessage.channel.id})\n**Created At** → ${new Timestamp('LLL').display(oMessage.createdTimestamp)}\n**Updated At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
    }

    async init() {

    }

};