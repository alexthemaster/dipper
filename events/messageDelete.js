const { Event, Timestamp } = require('klasa');

module.exports = class extends Event {

	run(message) {
		if (message.command && message.command.deletable) {
			for (const msg of message.responses) {
				msg.delete();
			}
		}
		const settings = message.guild.settings.logs;
        if (settings.channel && settings.messageDelete) {
            return this.client.channels.get(settings.channel).send(`Message Deleted! (event: messageDelete)\n**Author** → ${message.author.tag} (${message.author.id})\n**Message Content** → \`${message.cleanContent}\` (${message.id})\n${message.attachments.size >= 1 ? `**Attachments** → ${message.attachments.size} attachments\n` : ''}**Channel** → ${message.channel.name} (${message.channel.id})\n**Created At** → ${new Timestamp('LLL').display(message.createdTimestamp)}\n**Deleted At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
	}

};
