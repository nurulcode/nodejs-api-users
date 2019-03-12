const express    = require('express');
const router     = express.Router();
const USER       = require('../models/user')
const config     = require('../models/config')
const jwt        = require('jsonwebtoken');
const helpers    = require('../helpers/util');
const bcrypt     = require('bcryptjs');

/* GET users listing. */
router.get('/', (req, res, next) => {
    USER.find({}).then((data) => {
        res.json(data);
    }).catch(err => console.log(err))
})

router.post('/register', (req, res, next) => {
    let register = new USER();
    let token = jwt.sign(req.body.email, config.secret);

    USER.findOne({ email: req.body.email}).then((user) => {

        if (!user) {
            if (req.body.password == req.body.retypepassword) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(req.body.password, salt);

                register.email = req.body.email
                register.password = hash
                register.token = token

                register.save((err) => {

                    if (err) return res.send(err);
                    res.status(201).json({
                        error : false,
                        data: {

                            email: req.body.email
                        },
                        password: token,

                    });
                });
            } else {
                res.json({
                    error: true,
                    message: 'Registration failed'
                });
            }
        } else {
            res.json({
                error: true,
                message: 'This email is already registered'
            });
        }
    }).catch(err => console.log(err))
});

router.post('/login', (req, res, next) => {
    USER.findOne({ email: req.body.email}).then((user) => {
        if (!user) {
            res.json({
                error: true,
                message: 'Unregistered user'
            });
        } else {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    error: true,
                    message: 'Password does not match'
                });
            } else {
                let token = jwt.sign(user.email, config.secret);

                USER.updateOne({email : req.params.email}, {$set : {token : token} }, (err) => {
                    if (err) return res.send(err);
                    res.status(201).json({
                        error : false,
                        data: {
                            email : user.email
                        },
                        token : token
                    });
                });
            }
        }
    }).catch(err => console.log(err))
});

router.post('/check', helpers.token, (req, res, next) => {
    res.status(201).json({
        token : req.decoded,
        valid : true
    });
});

router.get('/destroy', helpers.token, (req, res, next) => {
    USER.findOne({email: req.query.email}, (err, user) => {
        console.log(user);
        USER.updateOne({ email : req.query.email}, {$set: {token: null} }, (err) => {
            if(err) return res.send(err);
            res.status(201).json({
                logout : true
            });
        });
    });
});


module.exports = router;
