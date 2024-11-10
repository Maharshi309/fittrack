const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route for registering a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Create and save the new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Redirect to authentication page after successful registration
        res.redirect("/auth");
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Route for logging in a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        // Check if password matches the stored hash
        const isMatch = await user.isPasswordMatch(password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        // Store user session and redirect to home page
        req.session.user = { username: user.name }; // Store the username or other necessary data in the session
        res.redirect("/");
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Route for logging out a user
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/auth');
    });
});

module.exports = router;
