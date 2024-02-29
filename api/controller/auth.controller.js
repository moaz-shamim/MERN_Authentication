import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (request, response, next) => {
  try {
    // Extract username, email, and password from request body
    const { username, email, password } = request.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return response.status(400).send({
        message: "Send all the required fields username, email, password",
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user instance with hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    return response.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    // Log the error to console for debugging
    console.log(error.message);

    // Pass the error to the error handling middleware
    next(error);

    // Alternative approach: directly call errorHandler function
    // next(errorHandler(300, "Something went wrong"));
  }
};

export const signin = async (request, response, next) => {
  try {
    // Extract  email, and password from request body
    const { email, password } = request.body;

    // Check if all required fields are provided
    if (!email || !password) {
      return response.status(400).send({
        message: "Send all the required fields  email, password",
      });
    }

    // Find the user in the database based on the provided username or email.
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not Found"));
    }

    // const {...rest} = user
    // console.log(rest);

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Wrong Credentials"));
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user._email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    // Securing the cookies prevents modification at the client side.
    const options = {
      httpOnly: true,
      secure: true,
    };

    // Remove unwanted fields that we don't want to send to the client.
    const loggedInUser = await User.findById(user._id).select("-password ");

    return response
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(loggedInUser);
  } catch (error) {
    // Log the error to console for debugging
    console.log(error.message);

    // Pass the error to the error handling middleware
    next(error);
  }
};

export const google = async (request, response, next) => {
  try {
    // Extract  email from request body
    const { email } = request.body;

    // Find the user in the database based on the provided username or email.
    const user = await User.findOne({ email });

    if (user) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user._email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      // Securing the cookies prevents modification at the client side.
      const options = {
        httpOnly: true,
        secure: true,
      };

      // Remove unwanted fields that we don't want to send to the client.
      const loggedInUser = await User.findById(user._id).select("-password ");

      return response
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(loggedInUser);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      // Hash the password using bcrypt
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Create a new user instance with hashed password
      const newUser = new User({
        username:
          request.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: request.body.email,
        password: hashedPassword,
        profilePicture: request.body.photo,
      });

      // Save the new user to the database
      await newUser.save();

      const accessToken = jwt.sign(
        {
          id: newUser._id,
          email: newUser._email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      // Securing the cookies prevents modification at the client side.
      const options = {
        httpOnly: true,
        secure: true,
      };

      // Remove unwanted fields that we don't want to send to the client.
      const loggedInUser = await User.findById(newUser._id).select(
        "-password "
      );

      return response
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(loggedInUser);
    }
  } catch (error) {
    // Log the error to console for debugging
    console.log(error.message);

    // Pass the error to the error handling middleware
    next(error);
  }
};

export const signout = (request, response) => {
  response.clearCookie("accessToken").status(200).json("Signout success!");
};
