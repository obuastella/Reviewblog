import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
//a fucnntion that alows us coonect to db
// export const connectDb = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB connected successfully ${conn.connection.host}`);
//   } catch (error) {
//     console.log("Error connecting mongoDB:", error.message);
//     process.exit(1); // 1 failure, status code is success
//   }
// };
// Function to connect to the database
export const connectDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is not defined. Check your environment variables."
      );
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
