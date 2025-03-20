import { User } from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/emailService.js";
import dotenv from "dotenv";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image provided" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_images",
    });

    // Delete local file safely
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.error("Failed to delete temp file:", err);
    }

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.userId,
      { profileImage: result.secure_url },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "Profile image updated successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { fullname, email, phone } = req.body;

    // Ensure at least one field is being updated
    if (!fullname && !email && !phone) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided to update" });
    }

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { fullname, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!email || !password || !fullName) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        return res.status(400).json({
          success: false,
          message:
            "This email is registered but not verified. Please check your email for the verification code.",
        });
      }
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 8);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashPassword,
      fullName,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // expires in 24 hours
    });

    await user.save();

    // Authenticate with JWT
    generateTokenAndSetCookie(res, user._id);

    sendVerificationEmail(user.email, verificationToken);

    return res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }, // this checks if the token is expired
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.fullName);
    res.status(200).json({
      success: true,
      message: "User email verified successfully.",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("An error occured while verifying the email", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is not verified. Please check your email for the verification code.",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Password is invalid" });
    }

    generateTokenAndSetCookie(res, user.id);
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in Login", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!email)
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiredAt = resetExpiry;
    await user.save();
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiredAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid or expired reset token" });
    }
    // update password in db
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiredAt = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);
    res.status(200).json({
      success: true,
      message:
        "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Error in Reset Password:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in checkAuth", error);
    res.status(400).json({ error: error.message });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new password are required",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully. A confirmation email has been sent.",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
