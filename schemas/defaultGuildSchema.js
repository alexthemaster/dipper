const { Client } = require('klasa');

Client.defaultGuildSchema.add('logs', folder => folder
    .add('channel', 'textchannel')
    .add('channelCreate', 'boolean')
    .add('channelDelete', 'boolean')
    .add('channelUpdate', 'boolean')
    .add('emojiCreate', 'boolean')
    .add('emojiDelete', 'boolean')
    .add('emojiUpdate', 'boolean')
    .add('guildBanAdd', 'boolean')
    .add('guildBanRemove', 'boolean')
    .add('guildCreate', 'boolean')
    .add('guildDelete', 'boolean')
    .add('guildMemberAdd', 'boolean')
    .add('guildMemberRemove', 'boolean')
    .add('messageDelete', 'boolean')
    .add('messageDeleteBulk', 'boolean')
    .add('messageUpdate', 'boolean')
    .add('roleCreate', 'boolean')
    .add('roleDelete', 'boolean')
    .add('roleUpdate', 'boolean'));