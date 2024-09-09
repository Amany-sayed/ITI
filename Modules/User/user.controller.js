const nodemailer = require("nodemailer");
const sendEmailService = require("../../Services/sendEmailService.js");
const emailTemplate = require("../../Utilities/emailTemplate.js");
const User = require("../../Models/User.model.js");
const { hash, compare } = require("bcrypt");
/** send mail from testing account */
const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      repeatedPassword,
      firstName,
      lastName,
      userName,
      country,
      phoneNumber,
    } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    user = await User.findOne({ userName });
    if (user)
      return res.status(400).json({ message: "Username already exists" });
    if (password !== repeatedPassword)
      return res.status(400).json({ message: "Passwords do not match" });
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create(
      {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        userName,
        country,
        phoneNumber,
      },
      { new: true }
    );
    console.log(newUser);
    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
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
  logIn,
};
