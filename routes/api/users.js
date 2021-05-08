const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const user = require('../../models/user');
const Image = require('../../models/image')

//Registering user
router.post('/register', (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({status: "failure", msg: "Please enter all fields"})
    }

    User.findOne({email}).then(user => {
        if (user){
            return res.status(400).json({status: "failure", msg: "User already exists!"});
        }

        const newUser = new User ({
            name,
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {

                    jwt.sign(
                        { id: user.id },
                        'shopifyChallenge',
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.status(200).json(
                                {
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                }
                            )
                        }
                    )
                })
            })
        })
    })
})

//Authenticating Login
router.post('/login', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({status: "failure", msg: "Please enter all fields"})
    }

    User.findOne({ email })
    .then(user => {
        if (!user) return res.status(400).json({status: "failure", msg: "User does not exist"})

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({status: "failure", msg: "Bad credentials"})
                jwt.sign(
                    { id: user.id },
                    'shopifyChallenge',
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.status(200).json(
                            {
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            }
                        )
                    }
                )
            })
    })
})

//Route to get user information based on token
router.get('/user', auth, (req, res) => {
    const imageArr = []

    user.findById(req.user.id)
        .select('-password')
        .then(user => {
            
            Image.find({}).where('_id').in(user.uploads).then((objs) => {
                return res.json({status: "success", user, uploads: objs})
            })
        })
    
})

module.exports = router;