const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const sendEmailService = require("../Services/sendEmailService.js");
const emailTemplate = require("../Utilities/emailTemplate.js");


/** send mail from testing account */
const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  const userEmail = req.body.email || req.user.email;
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
    to: userEmail,
    subject: "Hello ✔",
    text: "Successfully Register with us.",
    html: "<b>Successfully Register with us.</b>",
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  console.log("dwsdwd");
  // res.status(201).json("Signup Successfully...!");
};

/** send mail from real gmail account */
const getMail = async (req, res) => {
  const userEmail = req.body.email || req.user.email; 

  try {
    // Call the sendEmailService function and log the result
    const isEmailSent = await sendEmailService({
      to: userEmail, 
      subject: "Confirm Email",
      message: emailTemplate({
        link: "Email Verified",
        linkData: "click here to confirm your email",
        subject: "Email Confirmation",
      }),
    });

    console.log("Email sent successfully:", isEmailSent); 

    // Send a response based on whether the email was sent
    if (isEmailSent) {
      return res.status(201).json("Email sent successfully!");
    } else {
      return res.status(500).json("Failed to send email.");
    }
  } catch (err) {
    console.error("Error in sending email:", err); 
    res.status(500).json({ error: "An error occurred while sending email." });
  }
};

module.exports = {
  signup,
  getMail,
};
