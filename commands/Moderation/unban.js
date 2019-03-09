const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'unban',
            enabled: true,
            runIn: ['text'],
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
            description: 'Un-ban a member!',
            quotedStringSupport: false,
            usage: '<member:user> [reason:...string]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });

        this.customizeResponse('member', "Please specify a user you want to un-ban!")
    }

    async run(message, [member, reason = `Un-banned by admin.`]) {
        if (!message.member.permissions.has('ADMINISTRATOR')) throw "You don't have permission to do this.";
        const bans = await message.guild.fetchBans();
        if (!bans.has(member.id)) throw "This user is not banned!";

        const settings = message.guild.settings.logs;

        const embed = new MessageEmbed()
            .setColor('#42f4c5')
            .setAuthor(`Moderator: ${message.author.tag}`, message.author.displayAvatarURL({ size: 2048 }))
            .setTitle('Member un-banned!')
            .setDescription(`**Member** → ${member} (${member.tag} - ${member.id})\n**Reason** → ${reason}`)
            .setTimestamp();

        member.bot ? '' : this.client.users.has(member.id) ? await this.client.users.get(member.id).send(`You have been un-banned from ${message.guild.name} by ${message.author.tag}!`) : '';

        await message.guild.members.unban(member, reason);

        await message.send(`Successfully un-banned \`${member.tag}\`!`);

        settings.channel ? this.client.channels.get(settings.channel).send(embed) : '';
    }

    async init() {

    }

};