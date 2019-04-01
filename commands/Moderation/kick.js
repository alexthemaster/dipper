const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'kick',
            enabled: true,
            runIn: ['text'],
            cooldown: 5,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: ["KICK_MEMBERS"],
            requiredSettings: [],
            subcommands: false,
            description: 'Kick a member!',
            quotedStringSupport: false,
            usage: '<member:member> [reason:...string]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('member', "Please specify a member you want to kick!")
    }

    async run(message, [member, reason = 'No reason provided.']) {
        if (!message.member.permissions.has('KICK_MEMBERS')) throw "You don't have permission to do this.";
        if (member.user === message.author) throw "You thought you was clever, eh?";
        if (!member.kickable) throw `I'm sorry, but I can't kick ${member.user.tag}!`;

        const settings = message.guild.settings.logs;

        const embed = new MessageEmbed()
            .setColor('#42f4c5')
            .setAuthor(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL({ size: 2048 }))
            .setTitle('Member kicked!')
            .setDescription(`**Member** → ${member.user} (${member.user.tag} - ${member.user.id})\n**Reason** → ${reason}`)
            .setTimestamp();

        member.user.bot ? '' : await member.user.send(`You have been kicked from ${message.guild.name} by ${message.author.tag} for: ${reason}`);

        await member.kick(reason);

        await message.send(`Successfully kicked \`${member.user.tag}\`!`);

        settings.channel ? this.client.channels.get(settings.channel).send(embed) : '';
    }

    async init() {

    }

};