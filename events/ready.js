const { Client, Event } = require('klasa');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'ready',
            enabled: true,
            event: 'ready',
            once: false
        });
    }

    async run() {
        await this.client.user.setActivity(`${this.client.options.prefix}confused`);
        await this.client.user.setStatus('dnd');
    }

    async init() {
    }

};