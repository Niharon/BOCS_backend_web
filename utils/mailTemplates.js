const mailTemplates = {

    // template for forgot password otp 

    forgotPassword: (otp) => {

        return `<div style="text-align:center;font-size: 16px;margin: 1rem auto;">
        Your Password Reset OTP : <p style="
    font-size: 24px;
    font-weight: bold;
    background: aliceblue;
    padding: 6px 4px;
    max-width: 450px;
    color: #3c3c3c;
    margin: 20px auto 25px;
    ">${otp}</p> 
      </div>`

    }
}

module.exports = mailTemplates;