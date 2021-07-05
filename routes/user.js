const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../model/user')
const dotenv = require('dotenv')
dotenv.config()

routes.post('/signup', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            res.send(err, "Try Again")
        }
        else {
            users.findOne({ email: req.body.email })
                .then((user) => {
                    if (user != null) {
                        var err = 'Email ' + email + ' already exists!'
                        return res.json({ error: err })
                    } else {
                        return users.create({
                            email: email,
                            password: hash
                        })
                    }
                })
                .then((user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({ status: 'Registration Successful!', users: user });
                })
                .catch((err) => next(err));
        }
    })
});

routes.post('/login', (req, res, next) => {
    var email = req.body.email;
    users.findOne({ email: email })
        .then((user) => {
            console.log(user)
            if (user === null) {
                var err = new Error('Email ' + email + ' does not exist!');
                err.status = 403;
                return next(err);
            }
            else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) {
                        var err = new Error("Auth Failed")
                        err.status = 404;
                        return next(err);
                    }
                    else if (result == false) {
                        var err = new Error('Your password is incorrect!');
                        err.status = 403;
                        return next(err);
                    }
                    else if (result) {
                        var token = jwt.sign({ email: user.email, userid: user._id }, process.env.secret_key,{ expiresIn: "1h" })
                        res.setHeader('Content-Type', 'text/plain');
                        res.status(200)
                        res.cookie(token);
                        res.json({ message: 'You are authenticated!', token: token })
                    }
                })
            }
        })
        .catch((err) => next(err));
}
)

module.exports = routes;
