import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library
import { errorHandler } from "./error.js";

// Middleware function to verify the access token
export const verifyToken = (request, response, next) => {
  const token = request.cookies.accessToken; // Extracting the access token from cookies

  // If token doesn't exist, return unauthorized status
  if (!token) {
    return next(errorHandler(401, "You are not Authenticated"));
  }

  // Verifying the token using jsonwebtoken library
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    // If token verification fails, error will not be null
    if (error) return next(errorHandler(403, "Token is not valid"));

    // If verification succeeds, user will contain decoded user information
    request.user = user; // Assigning decoded user information to request object

    next(); // Move to the next middleware or route handler
  });
};
