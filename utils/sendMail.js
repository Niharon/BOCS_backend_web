
const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');
require("dotenv").config();

const sendMail = async (to,subject,body)=>{

    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
        from:process.env.NODEMAILER_EMAIL,
        to:to,
        subject:subject,
        html:body
    }

    try{

        const info = await transporter.sendMail(mailOptions);
        return info;

    }catch(error){
        return error;
    }
}

module.exports = sendMail;