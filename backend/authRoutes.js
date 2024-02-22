const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const verifyToken = require('./middlewares/verifyToken');

const { authenticateWithGoogle, loginUser, registerUser } = require('./services/userServices');

const User = require('./schemas/user.js');
// Registration endpoint
router.post('/register', async (req, res) => {
    // Extract user details from request body
    const { username, email, password } = req.body;

    try {
        const existingUsername = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUsername || existingEmail) {
            const message = existingUsername && existingEmail ? 'Email and username are taken'
                : existingEmail ? 'Email is taken'
                    : 'Username is taken';
            return res.status(400).json({ success: false, message });
        }

        // Create and save the new user
        const user = new User({
            username: username, email: email, password: password
        });
        await user.save();

        // Generate a token for the new user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`POST: /register new user ${username}`)
        // Send the token to the client
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { token }
        });
    } catch (error) {
        console.log(`POST: /register registration of ${username} failed`)
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error registering new user'
        });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, token } = await loginUser({ email, password });

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                token,
                user: {
                    username: user.username,
                    email: user.email,
                    // Add other fields but exclude sensitive ones
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/validate-token', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // Assuming Mongoose for DB operations
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({
            success: true,
            message: 'Token is valid',
            data: {
                user: {
                    username: user.username,
                    email: user.email,
                    // Add other fields but exclude sensitive ones
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user details',
            error: error.message
        });
    }
});

router.post('/google-login', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({
            success: false,
            message: 'No authorization code provided'
        });
    }

    try {
        // const { tokens } = await client.getToken(code);
        // if (!tokens || !tokens.access_token) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Failed to retrieve access token'
        //     });
        // }

        // client.setCredentials(tokens);
        // const oauth2 = google.oauth2({
        //     auth: client,
        //     version: 'v2'
        // });
        // const userInfo = await oauth2.userinfo.get();

        // if (!userInfo || !userInfo.data || !userInfo.data.id || !userInfo.data.email || !userInfo.data.name) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Invalid user information received from Google'
        //     });
        // }

        // let user = await User.findOne({ googleId: userInfo.data.id });
        // if (!user) {
        //     user = new User({
        //         googleId: userInfo.data.id,
        //         email: userInfo.data.email,
        //         username: userInfo.data.name,
        //         picture: userInfo.data.picture // Assuming you have a field for storing the user's picture URL
        //     });
        //     await user.save();
        // }

        // const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

        const { user, token } = await authenticateWithGoogle(code);
        res.status(200).json({
            success: true,
            message: 'Google login successful',
            data: {
                token,
                user: {
                    username: user.username,
                    email: user.email,
                    picture: user.picture
                }
            }
        });

    } catch (error) {
        console.log('Google login failed:', error);
        res.status(500).json({
            success: false,
            message: 'Google login failed'
        });
    }
});

module.exports = router;