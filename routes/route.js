const router = require('express').Router();
const fetch = require('node-fetch');

const secret = "vhYXxXY-aFya3wFrGeJzzOlnjDNMNmgL";

router.get('/', async (req, res) => {
    const user = await getUser(req.cookies.token);
    console.log(user)
    res.render('home', {
        loggedIn: user ? true : false,
        username: user ? `${user.username}#${user.discriminator}` : '',
        avatar: user ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}${user.avatar.startsWith('a_') ? '.gif' : '.png'}?size=2048` : '',
        owner: user ? user.id === req.client.options.ownerID : '',
        info: req.client
    })
})

router.get('/login', (req, res) => {
    if (req.cookies.token) res.redirect('/');
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${req.client.user.id}&redirect_uri=${encodeURIComponent(`${req.protocol}://${req.get('host')}/callback`)}&response_type=code&scope=identify`)

});

router.get('/callback', async (req, res) => {
    if (req.cookies.token) res.redirect('/');
    if (!req.query.code) res.redirect('/login');
    let r = await fetch('https://discordapp.com/api/oauth2/token', {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `client_id=${req.client.user.id}&client_secret=${req.client.user.id == 346741490908921877 ? 'IdMm0nlKQ3ITcqIa3xQ4X4K5q07khClA' : secret}&grant_type=authorization_code&code=${req.query.code}&redirect_uri=${encodeURIComponent(`${req.protocol}://${req.get('host')}/callback`)}&scope=identify`
    });

    if (r.status !== 200) res.redirect('/login');

    r = await r.json();

    res.cookie('token', r.access_token, {
        maxAge: r.expires_in * 1000
    });

    res.redirect('/')
});

async function getUser(token) {
    let r = await fetch('https://discordapp.com/api/v6/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (r.status !== 200) return false;

    r = await r.json();

    return r;
}

module.exports = router;