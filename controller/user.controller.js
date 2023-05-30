const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const mailTemplates = require("../utils/mailTemplates");

// Generate a random 256-bit (32-byte) secret key

exports.createUser = async (req, res, next) => {
  try {
    const { email, deviceId, password, name } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPass, deviceId, name });

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ message: 'User created successfully', token: token, role: "user", name: user.name });

  } catch (error) {
    res.status(400).json(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password, deviceId } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }
    // first check if the device is same or not
    if (user.role === "user" && user.deviceId !== deviceId) {
      throw new Error('Device not matched or deviceId not provided');
    }
    // now check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid Credentials');
    }

    // console.log(process.env.JWT_SECRET)

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful', token: token, role: user.role, name: user.name });

  } catch (error) {
    next(error);
  }
};

exports.forgetPass = async (req, res, next) => {
  try {

    const { email } = req.body;
    // find the user in database;
    const userExist = await User.findOne({
      where: {
        email: email,
      }
    })

    if (!userExist) return res.json({ success: false, message: "User not Found with the email" })

    // generate random 6 digits OTP;

    const otp = parseInt(Math.random() * 1000000)
    userExist.resetPasswordOTP = otp;
    await userExist.save();

    // send mail to user
    let msgBody = mailTemplates.forgotPassword(otp);
    const info = await sendMail(email, "Password Reset OTP", msgBody);
    // console.log(info);
    if (info.messageId) {
      res.json({
        success: true,
        message: "An OTP is sent to the email"
      })
    }
    else {

      next(new Error("Something error in sending mail"));
    }

  } catch (e) {
    next(e)
  }
}

exports.checkOtp = async (req, res, next) => {


  try {
    const { email, otp } = req.body;

    const userExist = await User.findOne({
      where: {
        email: email,
      }
    })

    if (!userExist) return res.json({ success: false, message: "User not Found with the email" })

    // check otp
    if (parseInt(userExist.resetPasswordOTP) === otp) {
      res.json({
        success: true,
        message: "OTP verified successfully"
      })
    }
    else {
      res.json({
        success: false,
        message: "Invalid OTP"
      })
    }
  }
  catch (e) {
    next(e)
  }


}

exports.resetPassword = async (req, res, next) => {

  try {

    const { email, otp, password } = req.body;

    const userExist = await User.findOne({
      where: {
        email: email,
      }
    })

    if (!userExist) return res.json({ success: false, message: "User not Found with the email" })

    // check otp
    if (parseInt(userExist.resetPasswordOTP) === otp) {
      // update password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      userExist.password = hashedPass;
      await userExist.save();
      userExist.resetPasswordOTP = null;
      res.json({
        success: true,
        message: "Password updated successfully"
      })
    }
    else {
      res.json({
        success: false,
        message: "Invalid OTP"
      })
    }


  } catch (e) {
    next(e)
  }
}