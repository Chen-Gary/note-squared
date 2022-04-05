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

const sendVerificationCode = (name, email, confirmationCode) => {
    //console.log("Check");
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for registering Note^2. Please use the following verification code to confirm your email address: </p>
        <br>
        <p>${confirmationCode}</p>
        <br>
        <p>Thank you!</p>
        </div>`,
    }).catch(err => console.log(err));
}

module.exports = {
    sendVerificationCode,
}
