const { Client, PermissionLevels } = require('klasa');
const config = require('./data/config.json');

config.permissionLevels = new PermissionLevels()
    .add(0, () => true)
    .add(6, ({ guild, member }) => guild && member.permissions.has('ADMINISTRATOR'), { fetch: true })
    .add(7, ({ guild, member }) => guild && member === guild.owner, { fetch: true })
    .add(9, ({ author, client }) => author === client.owner, { break: true })
    .add(10, ({ author, client }) => author === client.owner);

require('./schemas/defaultUserSchema');
require('./schemas/defaultGuildSchema');

new Client({
    fetchAllMembers: false,
    disableEveryone: true,
    prefix: config.prefix,
    commandEditing: true,
    schedule: {
        interval: 20000
    },
    permissionLevels: config.permissionLevels,
    ownerID: config.owner,
    production: true,
    readyMessage: (client) => `Successfully initialized as ${client.user.tag}. Ready to serve ${client.guilds.size} guilds with a total of ${client.users.size} users.`
}).login(config.token);