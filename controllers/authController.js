import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "user already existed",
      });
    }
    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword);

    const user = await new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    }).save();

    console.log(user);

    res.status(201).send({
      success: true,
      message: "user created successfully",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong while creating user",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({
      success: false,
      message: "Invalid email or password",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user does not exists",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });

    res.status(200).send({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unable to login",
      error,
    });
  }
};
