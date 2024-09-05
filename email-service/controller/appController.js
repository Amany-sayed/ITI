const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const sendEmailService=require('../Services/sendEmailService.js');
const emailTemplate=require('../Utilities/emailTemplate.js');

const { use } = require('../routes/routs.js');

/** send mail from testing account */
const signup = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass, 
        },
    });

    let message = {
        from: `"HOME SHOPPING 🛒"${EMAIL}`,
        to: "amanyalsayed919@gmail.com",
        subject: "Hello ✔", 
        text: "Successfully Register with us.", 
        html: "<b>Successfully Register with us.</b>",
    }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
            .json({
                msg: "you should receive an email",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    console.log('dwsdwd');
    // res.status(201).json("Signup Successfully...!");
}

/** send mail from real gmail account */
const getbill = (req, res) => {

    const { userEmail } = 'amanyalsayed919@gmail.com';
    
    const isEmailsent = sendEmailService({
        to: userEmail,
        subject: "Confirm Email",
        message: emailTemplate({
            link: "Email Verfied",
            linkData: "click here to confirm your email",
            subject: "Email Confirmation",
        }),
    });

    res.status(201).json("getBill Successfully...!");
}

module.exports = {
   signup,
   getbill
}