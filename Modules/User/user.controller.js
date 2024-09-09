const jwt = require("jsonwebtoken");
const { hash } = require("bcrypt");
const sendEmailService = require("../../Services/sendEmailService.js");
const emailTemplate = require("../../Utilities/emailTemplate.js");
const User = require("../../Models/User.model.js");

/** Signup function */
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
    if (user) return res.status(400).json({ message: "Username already exists" });

    if (password !== repeatedPassword) return res.status(400).json({ message: "Passwords do not match" });
    const hashedPassword = await hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userName,
      country,
      phoneNumber,
    });

    // Generate email verification token
    const emailVerificationToken = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const emailVerificationLink = `http://localhost:3000/verify-email?token=${emailVerificationToken}`;

    // Send verification email
    const isEmailSent = await getMail(email, emailVerificationLink);

    if (!isEmailSent) {
      return res.status(500).json({ message: "Failed to send confirmation email." });
    }

    return res.status(201).json({ message: "User created successfully, please check your email to confirm." });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//  login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isConfirmed) {
      return res.status(400).json({ message: "Please confirm your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        country: user.country,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

/** send mail from real gmail account */
const getMail = async (email, verificationLink) => {
  try {
    const isEmailSent = await sendEmailService({
      to: email,
      subject: "Confirm your Email",
      message: emailTemplate({
        link: verificationLink,
        linkData: "Click here to confirm your email",
        subject: "Email Confirmation",
      }),
    });

    console.log("Email sent successfully:", isEmailSent);
    return isEmailSent;
  } catch (err) {
    console.error("Error in sending email:", err);
    return false; 
  }
}

module.exports = {
  signup,
  getMail,
  login,
  logout,
};

// const signup = async (req, res) => {
//   try {
//     const {
//       email,
//       password,
//       repeatedPassword,
//       firstName,
//       lastName,
//       userName,
//       country,
//       phoneNumber,
//     } = req.body;

//     // Check if the email already exists
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "Email already exists" });

//     // Check if the username already exists
//     user = await User.findOne({ userName });
//     if (user) return res.status(400).json({ message: "Username already exists" });

//     // Check if passwords match
//     if (password !== repeatedPassword)
//       return res.status(400).json({ message: "Passwords do not match" });

//     // Hash the password
//     const hashedPassword = await hash(password, 10);

//     // Create new user
//     const newUser = await User.create({
//       email,
//       password: hashedPassword,
//       firstName,
//       lastName,
//       userName,
//       country,
//       phoneNumber,
//     });

//     console.log(newUser);
//     return res.status(201).json({ message: "User created successfully", newUser });
//   } catch (e) {
//     return res.status(500).json({ error: e.message });
//   }
// };
