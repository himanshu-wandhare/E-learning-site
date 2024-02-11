import { config } from "dotenv";
import authRoute from "./routes/authRoute.js";
import coursesRoute from "./routes/coursesRoute.js";
import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";

config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/courses", coursesRoute);

app.get("/", (req, res) => {
  res.send("hi bro");
});

app.listen(process.env.PORT, () => {
  console.log("App is running on port " + process.env.PORT);
});
