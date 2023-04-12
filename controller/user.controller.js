const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config({path:"./config.env"});


exports.createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const { name, email, phone, deviceId, birthday, fb, google, role } = req.body;
        const user = await User.create({ name, email, phone, password: hashedPass, deviceId, birthday, fb, google, role });
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' }); // generate JWT token
        res.status(201).json({ message: 'User created successfully', token: token }); // send token in response
    } catch (error) {
        res.status(401).send(error);
    }
};


exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Incorrect password');
            }
            const token = jwt.sign({ id: user.id },process.env.SECRET_KEY, { expiresIn: '1h' }); 
            res.status(200).json({ message: 'Login successful', token: token });
        }
    } catch (error) {
        res.status(400).json({ message: 'Login failed', error: error.message });
    }
};



