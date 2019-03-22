const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('./tokenGenerator');

const usersHelper = require('../data/helpers/usersHelper');

const router = express.Router();

/* 
 * Create a JWT and send it to the Frontend after successful signup or login 
 */

router.post('/signup', async (req, res) => {
    // Get the user registration information off the body.
    const user = req.body;
    // Make sure it has all the required data.
    if (user.username && user.password && user.plan) {
        // Hash the password and set the hash to the user object.
        user.password = bcrypt.hashSync(user.password, 14);

        // Now we have to chain a couple promises...
        // Attempt to insert the user into the database.
        await usersHelper.insert(user)
        .then(async newUser => {
            console.log(newUser)
            // If there's an error number on the newUser object then something went wrong.
            if(newUser.message.errno) {
                // Send back the error.
                res.status(400).json(newUser.message);
            }
            // Otherwise the user was created so let's get all the information available for it.
            else {
                await usersHelper.findById(newUser.user_id)
                .then(data => {
                    // Generate us a JWT to send to the client to store for sessions.
                    const token = JWT.generateToken(data[0]);
                    // Send to the client what we have on the user account and the token.
                    return res.status(200).json({data: data, token: token});
                })
            }
        })
    }
    else {
        return res.status(400).json({error: 'Signup requires a username, password and plan type.'});
    }
});

router.post('/login', async (req, res) => {
    const credentials = req.body;
    if (credentials.username && credentials.password) {
        const user = await usersHelper.findByUsername(credentials);
        if (!user || !bcrypt.compareSync(credentials.password, user[0].password)) {
            return res.status(401).json({error: 'Invalid username or password.'})
        }
        else {
            const token = JWT.generateToken(user[0]);
            const user = await usersHelper.findById(user[0].id);
            return res.status(200).json({user: user, token: token});
        }
    }
    else {
        return res.status(400).json({error: 'Login requires both a username and password.'});
    }
});

module.exports = router;