const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

// Generate a random 256-bit (32-byte) secret key
const secretKey = crypto.randomBytes(32).toString('hex');

exports.createUser = async (req, res,next) => {
  try {
    const { email, deviceId, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
        
    const user = await User.create({ email, password: hashedPass, deviceId });
        
    const token = jwt.sign({ id: user.id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
    res.status(201).json({ message: 'User created successfully', token: token });
  } catch (error) {
    res.status(400).json(error);
  }
};


exports.login = async (req, res,next) => {
    try {
      const { email, password, deviceId } = req.body;
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        throw new Error('User not found');
      }
      // first check if the device is same or not
      if (user.deviceId !== deviceId) {
        throw new Error('Device not matched or deviceId not provided');
      }
      // now check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid Credentials');
      }
      
      // console.log(process.env.JWT_SECRET)
      let token;
      if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
      } else {
        token = jwt.sign({ id: user.id,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1m' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      if (decoded.id !== user.id) {
        throw new Error('Invalid token');
      }
  
      res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
      next(error);
    }
  };
  