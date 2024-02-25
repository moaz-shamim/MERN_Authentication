import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (request, response, next) => {
  try {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
      return response.status(400).send({
        message: "Send all the required fields username, email, password",
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return response.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error.message);
    // return response.status(500).json({ message: error.message });
    next(error);
    // next(errorHandler(300, "Something went wrong"));
  }
};
