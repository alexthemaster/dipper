const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'messageDeleteBulk',
            enabled: true,
            event: 'messageDeleteBulk',
            once: false
        });
    }

    async run(messages) {
        for (const message of messages.values()) {
            if (message.command && message.command.deletable) {
                for (const msg of message.responses) {
                    msg.delete();
                }
            }
        }

        const settings = messages.first().guild.settings.logs;
        if (settings.channel && settings.messageDeleteBulk) {
            const msg = messages.map(message => `[${new Timestamp('LLL').display(message.createdAt)}] ${message.author.tag}: ${message.content}`);
            let res = await fetch('https://hastebin.com/documents', {
                method: "POST",
                body: msg.reverse().join('\n')
            });
            if (res.status !== 200) res = null;
            if (res) res = await res.json();

            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('Multiple Messages Deleted! (event: messageDeleteBulk)')
                .setDescription(`**Messages Deleted** → ${messages.size}${res ? `\n**Deleted Messages** → https://hastebin.com/${res.key}` : ''}\n**Channel** → ${messages.first().channel} (${messages.first().channel.id})\n**Deleted At** → ${new Timestamp('LLL').display(new Date())}`);
            return this.client.channels.get(settings.channel).send(embed);
        }
    }

    async init() {

    }

};