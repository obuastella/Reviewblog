import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.userId;
    console.log("req.userId:", req.userId);

    next();
  } catch (error) {
    console.error("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
