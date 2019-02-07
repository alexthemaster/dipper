const { Client } = require('klasa');

Client.defaultUserSchema.add('respects', 'integer', { default: 0, configurable: false })