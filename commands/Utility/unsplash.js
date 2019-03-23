const { Command, RichDisplay, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'unsplash',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 30,
            deletable: true,
            bucket: 1,
            aliases: ['stock', 'image', 'img'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS"],
            requiredSettings: [],
            subcommands: false,
            description: 'Perform a stock image search on Unsplash!',
            quotedStringSupport: false,
            usage: '[search:string] [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });
    }

    async run(message, [...search]) {
        const config = require('../../data/config.json');
        const base_url = 'https://api.unsplash.com/';
        const applicationId = config.unsplash.applicationId;
        const utm = `?utm_source=dipper&utm_medium=referral`;

        const time = new Timestamp('LLL');

        if (!search[0]) {
            let res = await fetch(`${base_url}/photos/random`, {
                headers: {
                    'Authorization': `Client-ID ${applicationId}`
                }
            });
            res = await res.json();

            const embed = new MessageEmbed()
                .setTitle('Stock Image Search')
                .setDescription(`Photographer: [${res.user.name}](${res.user.links.html}${utm})\nDownload: [${res.links.download}${utm}](${res.links.download}${utm})\n\nUploaded At: ${time.display(res.created_at)}\nImage Size: ${res.width} x ${res.height}`)
                .setURL(`${res.links.html}${utm}`)
                .setImage(res.urls.raw)
                .setFooter('Powered by Unsplash!')
                .setTimestamp();

            return message.send(embed)
        } else {
            let res = await fetch(`${base_url}/search/photos/?query=${search.join(' ')}`, {
                headers: {
                    'Authorization': `Client-ID ${applicationId}`
                }
            });
            res = await res.json();
            
            const display = new RichDisplay(new MessageEmbed().setTitle('Unsplash Search'));
            const final = [];

            for (let i = 0; i < 10; i++) {
                // not the best method of filtering out already used items, shame alex
                const index = Math.floor(Math.random() * res.results.length);
                final.push(res.results[index]);
                res.results = res.results.filter(i => i !== res.results[index]);
            }

            final.forEach(photo => {
                display.addPage(p => p.setDescription(`Photographer: [${photo.user.name}](${photo.user.links.html}${utm})\nDownload: [${photo.links.download}${utm}](${photo.links.download}${utm})\n\nUploaded At: ${time.display(photo.created_at)}\nImage Size: ${photo.width} x ${photo.height}`).setURL(`${photo.links.html}${utm}`).setImage(photo.urls.raw))
            });

            display.run(await message.send('Loading...'), { filter: (reaction, user) => user.id === message.author.id });

        }
    }

    async init() {

    }

};