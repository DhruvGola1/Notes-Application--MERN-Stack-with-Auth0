import mongoose from "mongoose";

const connectDB = async (DATA_URI) => {
  try {
    const connect = await mongoose.connect(DATA_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
