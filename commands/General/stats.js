const { Command, version: klasaVersion, Duration } = require('klasa');
const { version: discordVersion, MessageEmbed } = require('discord.js');
const os = require('os');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: language => language.get('COMMAND_STATS_DESCRIPTION')
		});
	}

	async run(message) {
		let [users, guilds, channels, memory] = [0, 0, 0, 0];

		if (this.client.shard) {
			const results = await this.client.shard.broadcastEval(`[this.users.size, this.guilds.size, this.channels.size, (process.memoryUsage().heapUsed / 1024 / 1024)]`);
			for (const result of results) {
				users += result[0];
				guilds += result[1];
				channels += result[2];
				memory += result[3];
			}
		}

		const embed = new MessageEmbed()
			.setColor('#f47742')
			.setAuthor('Bot Statistics', this.client.user.displayAvatarURL({ size: 2048 }))
			.addField("__Connected to:__", `${(guilds || this.client.guilds.size).toLocaleString()} guilds\n${(channels || this.client.channels.size).toLocaleString()} channels\n${(users || this.client.users.size).toLocaleString()} users`)
			.addField("__OS Information:__", `Uptime: ${ms(os.uptime() * 1000, { long: true })}\nCPU: ${os.cpus()[0].model}\nTotal RAM: ${this.bToGB(os.totalmem)}GB\nFree RAM: ${this.bToGB(os.freemem)}GB`)
			.addField("__Bot Information:__", `Bot Uptime: ${ms(this.client.uptime, { long: true })}\nRAM Usage: ${(memory || (process.memoryUsage().heapUsed / 1024 / 1024)).toFixed(2)}MB\nNodeJS Version: ${process.version}\nDiscord.JS Version: ${discordVersion}\nKlasa Framework Version: ${klasaVersion}`)

		return message.send(embed)
	}

	bToGB(bytes) {
		const byte = 0.00000095367432 / 1000;
		return (byte * bytes).toFixed(2);
	}

};
