const { Client, Event } = require('klasa');
const express = require('express');
const fs = require('fs-nextra');
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
        const app = express();
        const cookieParser = require('cookie-parser');

        app.use(cookieParser());
        app.set('view engine', 'ejs');
        
        const routes = `${this.client.userBaseDirectory}/routes`;

        const injectClient =  (req, res, next) => {
            req.client = this.client;
            next();
        };

        app.use('/', injectClient, require(`${routes}/route`));
        app.use('/admin', injectClient, require(`${routes}/admin`));

        const _PORT = process.env.PORT || 60;
        app.listen(_PORT, () => this.client.emit('log', `Admin panel started on port ${_PORT}`));
    }

};