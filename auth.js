const router = require('./rout');
const User = require('./models/user/User');
const {sequelize} = require('./connection')
const v4 = require('uuid').v4
const jwt = require('jsonwebtoken')

router.post('/signin', (req, res) => {

    if (!req.body) {
        return res.status(400).json({ false: 'asd' })
    } else {
        User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
            .then(user => {
                const payload = {
                    _id: user.id,
                    iss: 'http://localhost:4000',
                    permissions: 'poll',
                }
                const options = {
                    expiresIn: '7d',
                    jwtid: v4(),
                }
                const secret = new Buffer(req.body.password, 'base64')
                jwt.sign(payload, secret, options, (err, token) => {
                    console.log("TOKEN",token);
                    return res.json({token, name: user.name, surname: user.surname, id: user.id, access: true})
                })
            })
    }
})

module.exports = router;