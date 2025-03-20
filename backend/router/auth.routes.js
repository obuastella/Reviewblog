import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updateProfileImage,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.get("/check-auth", verifyToken, checkAuth); // whenever you reload your page it checks if the user is authenticated or not
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post(
  "/update-profile-image",
  verifyToken,
  upload.single("image"),
  updateProfileImage
);
export default router;
