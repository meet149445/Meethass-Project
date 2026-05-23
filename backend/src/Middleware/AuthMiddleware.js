import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel.js"

export const protect = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({
        message: "No token found",
      });
    }

    // REMOVE "Bearer "
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      "thankyou"
    );

    const user = await UserModel.findById(
      decoded.id
    ).select("-password");

    if (!user) {

      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export const adminOnly = (
  req,
  res,
  next
) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};