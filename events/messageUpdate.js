const { Event, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

	async run(old, message) {
		if (this.client.ready && old.content !== message.content) this.client.monitors.run(message);
		const settings = old.guild.settings.logs;
        if (settings.channel && settings.messageUpdate) {
            if (old.content === message.content) return;
            const embed = new MessageEmbed()
                .setColor('#42f4c5')
                .setTitle('Message Updated! (event: messageUpdate)')
                .setDescription(`**Author** → ${old.author.tag} (${old.author.id})\n**Old Message Content** → \`${old.cleanContent}\`\n**New Message Content** → \`${message.cleanContent}\`\n**Channel** → ${old.channel} (${old.channel.id})\n**Created At** → ${new Timestamp('LLL').display(old.createdTimestamp)}\n**Updated At** → ${new Timestamp('LLL').display(new Date())}`);
            return this.client.channels.get(settings.channel).send(embed);
        }
	}

};
