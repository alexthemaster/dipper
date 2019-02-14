const { Client, Event } = require('klasa');
const dbl = require("dblapi.js");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            name: 'klasaReady',
            enabled: true,
            event: 'klasaReady',
            once: false
        });
    }

    async run() {
        const config = require('../data/config.json');
        if (config.DBL && this.client.options.production) {
            console.log('Running in Production.. Posting stats to DBL!')
            const DBL = new dbl(config.DBL, this.client)
        } 
        await this.client.user.setActivity(`${this.client.options.prefix}confused`);
        await this.client.user.setStatus('dnd');
    }

    async init() {
    }

};