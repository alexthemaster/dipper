const { Client } = require('klasa');

Client.defaultGuildSchema.add('logs', folder => folder
    .add('channel', 'textchannel')
    .add('kick', 'boolean', { default: true })
    .add('ban', 'boolean', { default: true })
    .add('channelCreate', 'boolean', { default: true })
    .add('channelDelete', 'boolean', { default: true })
    .add('channelUpdate', 'boolean', { default: true })
    .add('emojiCreate', 'boolean', { default: true })
    .add('emojiDelete', 'boolean', { default: true })
    .add('guildBanAdd', 'boolean', { default: true })
    .add('guildBanRemove', 'boolean', { default: true })
    .add('guildMemberAdd', 'boolean', { default: true })
    .add('guildMemberRemove', 'boolean', { default: true })
    .add('messageDelete', 'boolean', { default: true })
    .add('messageDeleteBulk', 'boolean', { default: true })
    .add('messageUpdate', 'boolean', { default: true })
    .add('roleCreate', 'boolean', { default: true })
    .add('roleDelete', 'boolean', { default: true }));