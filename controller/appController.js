const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const sendEmailService = require("../Services/sendEmailService.js");
const emailTemplate = require("../Utilities/emailTemplate.js");


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

// MARK: login
const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new Error("Email not found", { cause: 404 }));
    }

    // Verify the password
    if (!pkg.compareSync(password, user.password)) {
      return next(new Error("Password not correct", { cause: 400 }));
    }

    // Generate a token
    const token = generateToken({
      payload: {
        email,
        _id: user._id,
        role: user.role,
      },
      signature: process.env.SIGN_IN_TOKEN_SECRET,
      expiresIn: "1h",
    });

    // Update user status and token
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { token, status: "online" },
      { new: true }
    );

    // Set up email transporter
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

    // Create email message
    let message = {
      from: `"HOME SHOPPING 🛒" <${process.env.EMAIL}>`,
      to: email,
      subject: "Login Successful ✔",
      text: "You have successfully logged in.",
      html: "<b>You have successfully logged in to your account.</b>",
    };

    // Send the email
    await transporter.sendMail(message);

    // Return response with updated user data and preview URL for the email
    return res.status(200).json({
      message: "User logged in",
      updatedUser,
      emailPreview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/** send mail from real gmail account */
const getMail = async (req, res) => {
  const userEmail = "amanyalsayed919@gmail.com"; // Correct the variable assignment

  try {
    // Call the sendEmailService function and log the result
    const isEmailSent = await sendEmailService({
      to: userEmail, // Use the correct email
      subject: "Confirm Email",
      message: emailTemplate({
        link: "Email Verified",
        linkData: "click here to confirm your email",
        subject: "Email Confirmation",
      }),
    });

    console.log("Email sent successfully:", isEmailSent); // Log the success/failure

    // Send a response based on whether the email was sent
    if (isEmailSent) {
      return res.status(201).json("Email sent successfully!");
    } else {
      return res.status(500).json("Failed to send email.");
    }
  } catch (err) {
    console.error("Error in sending email:", err); // Log the error for debugging
    res.status(500).json({ error: "An error occurred while sending email." });
  }
};

module.exports = {
  signup,
  getMail,
  logIn
};

