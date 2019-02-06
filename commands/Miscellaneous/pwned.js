const { Command, RichDisplay, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'pwned',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 60,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: false,
            description: 'Have you been pwned?',
            quotedStringSupport: false,
            usage: '<email:reg/\\w{2,}\\@\\w{2,}\\.\\w{2,}/gi>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('email', "This doesn't look like a valid email to me!");
    }

    async run(message, [email]) {
        let res = await fetch('https://haveibeenpwned.com/api/v2/breachedaccount/' + email.input,
        );
        // if (res.status != 200) return message.send("Something went wrong or there's no breaches linked to your account.")
        // if (res.status == 200) res = await res.json();
        console.log(res)
        res = await res.json();
        const display = new RichDisplay(new MessageEmbed().setAuthor(`Account Breaches for ${email.input}`, message.author.displayAvatarURL({ size: 2048 })).setColor('#508ff4'));
        const time = new Timestamp('LLL');
        res.forEach(breach => {
            display.addPage(t => setDescription(`**Name** → ${breach.Name}\n**Domain** → ${breach.Domain}\n**Breach Date** → ${time.display(breach.BreachDate)}\n**Added Date** → ${time.display(breach.AddedDate)}\n**Description** → ${breach.Description}\n**Verified Breach** → ${breach.isVerified}`).setImage(breach.LogoPath))
        });

        display.run(await message.send('Loading...'))
    }

    async init() {

    }

};