const { Client } = require('klasa');

Client.defaultGuildSchema.add('logs', folder => folder
    .add('channel', 'textchannel')
    .add('kick', 'boolean')
    .add('ban', 'boolean')
    .add('channelCreate', 'boolean')
    .add('channelDelete', 'boolean')
    .add('channelUpdate', 'boolean')
    .add('emojiCreate', 'boolean')
    .add('emojiDelete', 'boolean')
    .add('guildBanAdd', 'boolean')
    .add('guildBanRemove', 'boolean')
    .add('guildMemberAdd', 'boolean')
    .add('guildMemberRemove', 'boolean')
    .add('messageDelete', 'boolean')
    .add('messageDeleteBulk', 'boolean')
    .add('messageUpdate', 'boolean')
    .add('roleCreate', 'boolean')
    .add('roleDelete', 'boolean'));