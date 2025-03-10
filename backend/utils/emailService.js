import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplate.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send a verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: `"ReviewBlog" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "verificationCode",
      verificationToken
    ),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error("Error sending verification email");
  }
};

// Send a welcome email
export const sendWelcomeEmail = async (email, fullName) => {
  const dashboardURL = "https://reviewblog.onrender.com/discover";

  const mailOptions = {
    from: `"ReviewBlog" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Our Platform",
    html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", fullName).replace(
      "{dashboardURL}",
      dashboardURL
    ),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error("Error sending welcome email");
  }
};

// Send a password reset email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const mailOptions = {
    from: `"ReviewBlog" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error("Error sending password reset email");
  }
};

// Send a password reset success email
export const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    from: `"ReviewBlog" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset success email sent successfully");
  } catch (error) {
    console.error("Error sending password reset success email", error);
    throw new Error("Error sending password reset success email");
  }
};
