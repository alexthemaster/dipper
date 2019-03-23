const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	run(message) {
		if (message.command && message.command.deletable) {
			for (const msg of message.responses) {
				msg.delete();
			}
		}
		if (!message.content.length) return;
		const settings = message.guild.settings.logs;
		if (settings.channel && settings.messageDelete) {
			const embed = new MessageEmbed()
				.setColor('#42f4c5')
				.setTitle('Message Deleted! (event: messageDelete)')
				.setDescription(`**Author** → ${message.author.tag} (${message.author.id})\n**Message Content** → \`${message.cleanContent}\` (${message.id})\n${message.attachments.size >= 1 ? `**Attachments** → ${message.attachments.size} attachments\n` : ''}**Channel** → ${message.channel} (${message.channel.id})\n**Created At** → ${new Timestamp('LLL').display(message.createdTimestamp)}\n**Deleted At** → ${new Timestamp('LLL').display(new Date())}`);
			return this.client.channels.get(settings.channel).send(embed);
		}
	}

};
