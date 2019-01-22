const express = require('express');
const jwt = require('jsonwebtoken');

const app = express(); 

app.get('/', (req, res) => {
    res.json({
        message: 'Wellcome'
    });
});

app.post('/api/posts', middleAuth, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if (err) {
            res.status(403).send(err);
        } else {
            res.json({
                message: 'open',
                data
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    // mock user
    const user = {
        id: '123123123',
        username: 'Assmuni',
        email: 'assmuni@gmail.com'
    }

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });

});

function middleAuth(req, res, next) {
    const headerAuth = req.headers.authorization;

    if (typeof headerAuth !== 'undefined') {
        req.token = headerAuth;
        next();
    } else {
        res.status(403).send();
    }
}

app.listen(process.env.PORT || 3000, () => console.info('Server running at localhost:3000'));