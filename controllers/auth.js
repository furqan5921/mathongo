// controllers/auth.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,  
        });

        const savedUser = await user.save();

        const accessToken = jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN_SECRET);

        return res.status(201).json({ accessToken });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

module.exports = { signUp, signIn };
