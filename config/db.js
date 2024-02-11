import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully" + connect.connection.host);
  } catch (error) {
    console.log(error);
  }
}
