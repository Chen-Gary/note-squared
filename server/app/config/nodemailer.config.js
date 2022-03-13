const nodemailer = require("nodemailer")

const user = "note-squared@outlook.com"
const pass = "csc4001note"

const transport = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
        user: user,
        pass: pass,
    },
})


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    //console.log("Check");
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for registering Note^2. Please confirm your email by clicking on the following link</p>
        <br>
        <p>Your confirmation code is ${confirmationCode}</p>
        <br>
        <p>Please use the following API to confirm your account: </p>
        <p>GET: http://localhost:3000/confirm/:confirmationCode</p>
        <p>i.e.</p>
        <p>http://localhost:3000/confirm/${confirmationCode}</p>
        <p>OR</p>
        <p>http://[IP]:3000/confirm/${confirmationCode}</p>
        </div>`,
    }).catch(err => console.log(err));
};
