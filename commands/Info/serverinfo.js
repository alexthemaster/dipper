const { Command, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'serverinfo',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 120,
            deletable: true,
            bucket: 1,
            aliases: ['si'],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: ["EMBED_LINKS"],
            requiredSettings: [],
            subcommands: false,
            description: 'Gives you some information about the server.',
            quotedStringSupport: false,
            usage: '',
            usageDelim: undefined,
            extendedHelp: 'No extended help available.'
        });

        this.verificationLevels = {
            0: "None",
            1: "Low (must have verified email on account)",
            2: "Medium (must be registered on Discord for longer than 5 minutes)",
            3: "High (must be a member of the server for longer than 10 minutes)",
            4: "Very High (must have a verified phone number)"
        }
    }

    async run(message) {

        let icon = '\n\n';
        if (message.guild.iconURL()) {
            icon = `\nGuild Icon: [URL](${message.guild.iconURL({ size: 2048 })})\n\n`
        }

        const embed = new MessageEmbed()
            .setColor('#4daaf2')
            .setAuthor(message.guild.name, message.guild.iconURL({ size: 2048 }))
            .setDescription(`Server Name: **${message.guild.name}**\nServer ID: **${message.guild.id}**${icon}Owner: **${message.guild.owner}**\nOwner ID: **${message.guild.ownerID}**\n\nMembers: **${message.guild.memberCount} members**\nRegion: **${message.guild.region}**\nRoles: **${message.guild.roles.size} roles**\nVerification Level: **${this.verificationLevels[message.guild.verificationLevel]}**\n\nAFK Channel: **${message.guild.afkChannel ? message.guild.afkChannel : 'None'}**\nAFK Timeout: **${(message.guild.afkTimeout / 60).toFixed(0)} minutes**`)
            .setFooter(`Created on ${new Timestamp('LLL').display(message.guild.createdAt)}`)
        return message.send(embed)
    }

    async init() {

    }

};