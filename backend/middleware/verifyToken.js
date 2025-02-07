//check if the token is valid or not
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unathorized- no token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unathorized- Invalid token" });
    req.userId = decoded.userId;
    next(); //this calls the next function
  } catch (error) {
    console.error("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
