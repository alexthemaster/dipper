const { Command } = require('klasa');
const { exec } = require('child_process');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'update',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 0,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: true,
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
        await message.send('Right away.')
        exec('git pull', (err, stdout, stderr) => {
            if (err || stderr) return message.send(`Something went wrong: ${err || stderr}`);
            this.client.commands.get('reload').everything(message);
        }) 
    }

    async init() {

    }

};