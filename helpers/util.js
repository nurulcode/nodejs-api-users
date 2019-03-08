var jwt = require('jsonwebtoken');
const config = require('../models/config')

module.exports = {

    token: (req, res, next) => {
        var token = req.headers['authorization'];
        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {

                if (err) {
                    return res.status(403).json({
                        valid: false,
                        message: 'Is not in accordance'
                    })
                } else {
                    req.decoded = decoded;
                    next()
                }
            })
        } else {
            return res.status(403).send({
                valid: false,
                message: 'Tokens not available, please sign in'
            })
        }
    }
}
