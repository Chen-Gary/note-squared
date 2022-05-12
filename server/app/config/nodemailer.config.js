const nodemailer = require("nodemailer")

// config of email sender
const user = "note-squared@outlook.com"
const pass = "csc4001note"

const transport = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
        user: user,
        pass: pass,
    },
})

const sendVerificationCode_register = (name, email, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name},</h2>
        <p>Thank you for registering Note Squared. Please use the following verification code to confirm your email address: </p>
        <br>
        <p><b>${confirmationCode}</b></p>
        <br>
        <p>Thank you!</p>
        </div>`,
    }).catch(err => console.log(err));
}

const sendVerificationCode_resetPwd = (name, email, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Reset Your Password",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name},</h2>
        <p>You are trying to reset your password. Please use the following verification code to confirm your operation: </p>
        <br>
        <p><b>${confirmationCode}</b></p>
        <br>
        <p>If you never make this operation, please safely ignore this email.</p>
        <p>Please do not give the verification code to others!</p>
        </div>`,
    }).catch(err => console.log(err));
}


module.exports = {
    sendVerificationCode_register,
    sendVerificationCode_resetPwd
}
