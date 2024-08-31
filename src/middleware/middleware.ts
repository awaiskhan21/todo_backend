import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      message: "issue with authentication",
    });
  }

  try {
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.body.user_id = decode.user_id;
    next();
  } catch (e) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
