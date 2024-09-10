const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");
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
    if (user)
      return res.status(400).json({ message: "Username already exists" });

    if (password !== repeatedPassword)
      return res.status(400).json({ message: "Passwords do not match" });
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
      `${process.env.JWT_SECRET}`,
      { expiresIn: "1h" }
    );

    const emailVerificationLink = `http://localhost:3000/auth/verify-email/${emailVerificationToken}`;

    // Send verification email
    const isEmailSent = await sendEmailService({
      to: email,
      subject: "Confirm your Email",
      message: emailTemplate({
        link: emailVerificationLink,
        linkData: "Click here to confirm your email",
        subject: "Email Confirmation",
      }),
    });
    if (!isEmailSent) {
      return new Error("Email is not sent", { cause: 500 });
    }

    return res.status(201).json({
      message: "User created successfully, please check your email to confirm.",
    });
  } catch (e) {
    return new Error(e.message, { cause: 500 });
  }
};
const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return new Error("No token provided", { cause: 400 });
    }

    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return new Error("user not found", { cause: 404 });
    }

    user.isConfirmed = true;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return new Error(error.message, { cause: 400 });
  }
};
//  login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return new Error("User not found", { cause: 400 });
    }

    if (!user.isConfirmed) {
      return new Error("Please confirm your email before logging in", {
        cause: 400,
      });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return new Error("Invalid credentials", { cause: 400 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();
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
    return new Error(e.message, { cause: 500 });
  }
};

const logout = async (req, res) => {
  try {
    const { token } = req.authUser;
    await User.findOneAndUpdate({ token }, { token: "" });
    return res.status(200).json({ message: "logged out successfully" });
  } catch (e) {
    return new Error(e.message, { cause: 500 });
  }
};

module.exports = {
  signup,
  login,
  logout,
  confirmEmail,
};
