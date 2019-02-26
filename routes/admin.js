const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    if (!req.cookies.token) res.redirect('/login');

    const h = await checkOwner(req.client.options.ownerID, req.cookies.token);
    if (!h) return res.render('error', {
        error: "Sorry mate, but it looks like you're not the owner of the bot, I can't let you proceed."
    });
    res.send('u tha owner!!!');
});

router.get('/guild/:id', async (req, res) => {
    if (!req.cookies.token) res.redirect('/login');

    const h = await checkOwner(req.client.options.ownerID, req.cookies.token);
    if (!h) return res.render('error', {
        error: "Sorry mate, but it looks like you're not the owner of the bot, I can't let you proceed."
    });
    const g = req.client.guilds.get(req.params.id);
    if (!g) return res.status(404).render('error', { error: `no guild with the id of ${req.params.id} found` });
    res.send(`name: ${g.name}`);
});

async function checkOwner(id, token) {
    let r = await fetch('https://discordapp.com/api/v6/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (r.status !== 200) return false;

    r = await r.json();

    return id === r.id
}


module.exports = router;