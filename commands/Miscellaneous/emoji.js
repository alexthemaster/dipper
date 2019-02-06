const { Command, Timestamp } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'emoji',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: "The bot will try to find you an emoji you requested from the servers it's in.",
            quotedStringSupport: false,
            usage: '<emoji:string>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [emoji]) {
        const emojis = await this.client.emojis.filter(e => e.name === emoji);
        if (!emojis.first()) return message.send(`Couldn't find any emoji with the name of \`${emoji}\`!`, { disableEveryone: true });
        const emoj = emojis.first();
            const text = `Extracted from → ${emoj.guild.name}\nCreated at → ${new Timestamp('LLL').display(emoj.createdTimestamp)}\nFull URL → ${emoj.url}`
            message.send(text)
            // message.send(emojis.first().guild.name)
            // message.send(`${emojis.first()}\n[Send \`full\` within 10 seconds for full size]`).then(msg => {
            //     message.channel.awaitMessages(m => m.author === message.author, { max: 1, time: 10000 }).then(messages => {
            //         if (messages.first().content.toLowerCase() === 'full') {
            //             message.channel.send('Here you go.', { files: [emojis.first().url] });
            //             msg.edit(`${emojis.first()}`);
            //         } else {
            //             msg.edit(`${emojis.first()}`)
            //         }
            //     })
            // });
    }

    async init() {

    }

};