const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'ip',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 30,
            deletable: true,
            bucket: 1,
            aliases: ['whois'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS"],
            requiredSettings: [],
            subcommands: false,
            description: 'Get some information on a domain or IP!',
            quotedStringSupport: false,
            usage: '<input:string>',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('input', "This doesn't look like a valid IP / domain to me!");

        this.baseURL = 'http://ip-api.com/json/';
    }

    async run(message, [input]) {
        try {
            let res = await fetch(this.baseURL + encodeURIComponent(input));
            res = await res.json();

            if(res.message) return message.send(`We've encountered an error: ${res.message}`)

            const embed = new MessageEmbed()
                .setColor('#d86441')
                .setThumbnail('http://2.bp.blogspot.com/-lDTG5_jO97U/UvpB0RW48qI/AAAAAAAAARs/KFEvVVME8R8/s1600/ip-icon.png')
                .addField('IP:', res.query)
                .addField('Country:', res.country, true)
                .addField('Country Code:', res.countryCode, true)
                .addField('Region:', res.regionName, true)
                .addField('City:', res.city, true)
                .addField('Timezone:', res.timezone, true)
                .addField('ISP:', res.isp, true)
                .addField('Organization:', res.org, true)
                .addField('AS number/name:', res.as, true)
            return message.send(embed)
        } catch (err) {
            return message.send(`We've encountered an error: ${err}`)
        }
    }

    async init() {

    }

};