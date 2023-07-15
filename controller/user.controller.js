const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const mailTemplates = require("../utils/mailTemplates");
const { getAllNotificationsByUser } = require("./usernotification.controller");
const UserNotification = require("../models/UserNotification.model");

// Generate a random 256-bit (32-byte) secret key

// exports.createRandomUsers = async (req, res, next) => {
//   try {
//     const { count } = req.query || 50;
//     const users = [];
//     for (let i = 1; i <= count; i++) {
//       const email = `gmail${(i*50)+1}@gmail.com`;
//       const password = Math.random().toString(36).substring(2, 15);
//       const salt = await bcrypt.genSalt(10);
//       const hashedPass = await bcrypt.hash(password, salt);
//       const name = Math.random().toString(36).substring(2, 15);
//       const deviceId = Math.random().toString(36).substring(2, 15);
//       const user = await User.create({ email, password: hashedPass, deviceId, name });
//       users.push(user);

//     }
//     res.status(201).json({ message: 'Users created successfully', users: users });
//   } catch (error) {
//     res.status(400).json(error);
//   }

// }

exports.getAllUsers = async (req, res, next) => {
  try {
    // implement pagination
    const { page = 1, limit = 10 } = req.query;

    // console.log("limit ", limit)
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      attributes: { exclude: ["password", "resetPasswordOTP", "fb", "google"] },
      limit: +limit,
      offset: +offset,
    });

    res.status(200).json({ success: true, data: users });

    // const users = await User.findAll({
    //   attributes: { exclude: ['password', 'resetPasswordOTP', 'fb', 'google'] }
    // });

    // res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "deviceId",
        "created_at",
        "device_changable",
        "phone",
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ success: true, data: user });
  } catch (e) {
    next(e);
  }
};
exports.getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "deviceId",
        "created_at",
        "device_changable",
        "phone",
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({ success: true, data: user });
  } catch (e) {
    next(e);
  }
};


exports.createUser = async (req, res, next) => {
  try {
    const { email, deviceId, password, name } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPass,
      deviceId,
      name,
    });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(201)
      .json({
        message: "User created successfully",
        token: token,
        role: "user",
        name: user.name,
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (e) {
    next(e);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const updateQuery = {};
    const { name, email, phone } = req.body;
    if (name) updateQuery.name = name;
    if (email) updateQuery.email = email;
    if (phone) updateQuery.phone = phone;

    const { id } = req.user;

    // update the user

    const updatedUser = await User.update(updateQuery, {
      where: { id },
      returning: true,
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    res
      .status(200)
      .json({
        success: true,
        data: updatedUser,
        message: "User Profile updated successfully",
      });
  } catch (e) {
    next(e);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Old Password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPassword, salt);

    user.password = hashedPass;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });

  } catch (e) {
    next(e);
  }
}


exports.login = async (req, res, next) => {
  try {
    const { email, password, deviceId } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }
    // first check if the device is same or not
    if (user.role === "user" && user.deviceId !== deviceId) {
      if (user.device_changable) {
        user.deviceId = deviceId;
        await user.save();
      } else {
        throw new Error("Device not matched or deviceId not provided");
      }
    }
    // now check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    // console.log(process.env.JWT_SECRET)

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({
        message: "Login successful",
        token: token,
        role: user.role,
        name: user.name,
      });
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
      },
    });

    if (!userExist)
      return res.json({
        success: false,
        message: "User not Found with the email",
      });

    // generate random 6 digits OTP;

    const otp = parseInt(Math.random() * 1000000);
    userExist.resetPasswordOTP = otp;
    await userExist.save();

    // send mail to user
    let msgBody = mailTemplates.forgotPassword(otp);
    const info = await sendMail(email, "Password Reset OTP", msgBody);
    // console.log(info);
    if (info.messageId) {
      res.json({
        success: true,
        message: "An OTP is sent to the email",
      });
    } else {
      next(new Error("Something error in sending mail"));
    }
  } catch (e) {
    next(e);
  }
};

exports.checkOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const userExist = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userExist)
      return res.json({
        success: false,
        message: "User not Found with the email",
      });

    // check otp
    if (parseInt(userExist.resetPasswordOTP) === otp) {
      res.json({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    const userExist = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userExist)
      return res.json({
        success: false,
        message: "User not Found with the email",
      });

    // check otp
    if (parseInt(userExist.resetPasswordOTP) === otp) {
      // update password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      userExist.password = hashedPass;
      userExist.resetPasswordOTP = null;
      await userExist.save();
      res.json({
        success: true,
        message: "Password updated successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (e) {
    next(e);
  }
};

exports.getUserNotifications = async (req, res, next) => {
  try {
    const notifications = await getAllNotificationsByUser(req.user.id);
    // count the number of unread notifications
    const unreadCount = notifications.filter((n) => !n.is_read).length;
    return res.status(200).json({
      success: true,
      notifications,
      unreadCount:unreadCount

    });
  } catch (e) {
    next(e);
  }
};


exports.markNotificationAsRead = async (req, res, next) => {
  try {

    const { id } = req.params;
    const notification = await UserNotification.findOne({ where: { id } });
    if (!notification) {
      throw new Error("Notification not found");
    }
    notification.is_read = true;
    await notification.save();
    res.status(200).json({
      success: true,
      message: "notification status updated"
    })


  } catch (e) {
    next(e)
  }
}