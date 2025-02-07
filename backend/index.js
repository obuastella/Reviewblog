import express from "express";
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse income requests :req.body
// app.use(cookieParser()); //allows us to parse incoming cookies
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log(`Listening on port: ${PORT}`);
});
