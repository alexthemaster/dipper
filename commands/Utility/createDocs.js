const { Command, Timestamp } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'createdocs',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 10,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: '',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message) {
        const msg = await message.send('Alright, this will take a couple of seconds...');
        const data = { generatedAt: new Timestamp('LLL').display(new Date()), cmds: {} };

        this.client.commands.forEach(c => {
            if (c.permissionLevel == 10 || c.hidden) return;
            if (!data['cmds'][c.category]) data['cmds'][c.category] = {};
            data['cmds'][c.category][c.name] = { description: c.description, usage: c.usageString, usageDelim: c.usageDelim, description: c.description, guarded: c.guarded, runIn: c.runIn, permissionLevel: c.permissionLevel, cooldown: c.cooldown, nsfw: c.nsfw, aliases: c.aliases }
        });

        if ('hastebin' in message.flags) {
            try {
                let res = await fetch('https://hastebin.com/documents', {
                    method: "POST",
                    body: JSON.stringify(data)
                })
                res = await res.json();
                await msg.delete();
                return message.send(`Alright, here it is: https://hastebin.com/raw/${res.key}`);
            } catch (err) {
                await msg.delete();
                return message.send(`Error while uploading file to Hastebin.`, { files: [{ attachment: Buffer.from(JSON.stringify(data)), name: 'output.json' }] });
            }
        }

        await msg.delete();
        return message.send(`Here you go!`, { files: [{ attachment: Buffer.from(JSON.stringify(data)), name: 'output.json' }] });
    }

    async init() {

    }

};