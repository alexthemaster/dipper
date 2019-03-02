const { Event, Timestamp } = require('klasa');

module.exports = class extends Event {

	async run(old, message) {
		if (this.client.ready && old.content !== message.content) this.client.monitors.run(message);
		const settings = old.guild.settings.logs;
        if (settings.channel && settings.messageUpdate) {
            if (old.content === message.content) return;
            return this.client.channels.get(settings.channel).send(`Message Updated! (event: messageUpdate)\n**Author** → ${old.author.tag} (${old.author.id})\n**Old Message Content** → \`${old.cleanContent}\`\n**New Message Content** → \`${message.cleanContent}\`\n**Channel** → ${old.channel.name} (${old.channel.id})\n**Created At** → ${new Timestamp('LLL').display(old.createdTimestamp)}\n**Updated At** → ${new Timestamp('LLL').display(new Date())}\n--------------------`)
        }
	}

};
