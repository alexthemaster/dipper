const { Client, Event } = require('klasa');
const dbl = require("dblapi.js");

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
        const config = require('../data/config.json');
        if (config.DBL && this.client.options.production) {
            console.log('Running in Production.. Posting stats to DBL!')
            setInterval(() => {
                dbl.postStats(this.client.guilds.size);
            }, 1800000);
        } 
        await this.client.user.setActivity(`${this.client.options.prefix}confused`);
        await this.client.user.setStatus('dnd');
    }

    async init() {
    }

};