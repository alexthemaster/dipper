const { Command, RichDisplay, Timestamp } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'reminder',
            enabled: true,
            runIn: ['text', 'dm'],
            cooldown: 30,
            deletable: true,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: true,
            description: 'Create a reminder',
            quotedStringSupport: false,
            usage: '<add|list|delete> (id:id) (duration:duration) (text:text) [...]',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });


        this.createCustomResolver('id', (arg, possible, message, [action]) => {
            if (action === 'delete') return this.client.arguments.get('string').run(arg, possible, message);
            return undefined;
        });

        this.createCustomResolver('duration', (arg, possible, message, [action]) => {
            if (['list', 'delete'].includes(action)) return true;
            return this.client.arguments.get('time').run(arg, possible, message);
        });


        this.createCustomResolver('text', (arg, possible, message, [action]) => {
            if (['list', 'delete'].includes(action)) return true;
            return this.client.arguments.get('string').run(arg, possible, message);
        });
    }

    async list(message) {
        const reminders = this.client.settings.schedules.filter(t => t.data.user === message.author.id);
        if (!reminders || reminders.length < 1) return message.send('You currently have no reminders!');
        const ts = new Timestamp('LLL');
        const display = new RichDisplay(new MessageEmbed().setColor('C68136').setAuthor(`Reminders for ${message.author.tag}`, message.author.displayAvatarURL({ size: 2048 })))
        reminders.forEach(r => {
            display.addPage(e => e.setDescription(`ID: **${r.id}**\nText: \`${r.data.text}\`\nTime: **${ts.display(r.time)}**\nRecurring: **${r.recurring ? 'True' : 'False'}**`))
        })
        await display.run(await message.send('Loading...'), { filter: (reaction, user) => user === message.author })
    }

    async delete(message, id) {
        const reminder = this.client.schedule.get(id[0]);
        if (!reminder) return message.send('No reminder with this ID found.');
        if (reminder.data.user !== message.author.id) return message.send("This is not your reminder, you can't delete it!");
        await reminder.delete();
        return message.send('Reminder deleted!')
    }

    async add(message, [id, duration, ...text]) {
        const reminder = await this.client.schedule.create('reminder', duration, {
            data: {
                user: message.author.id,
                channel: message.guild ? message.channel.id : null,
                text: text.join(' ')
            },
            catchUp: true
        });
        return message.send(`Reminder with the ID \`${reminder.id}\` created! I'll DM you when the time comes!${message.guild ? " (I will also send you a reminder message here)" : ''}`)
    }

    async init() {

    }

};