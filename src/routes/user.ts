import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/middleware";
import { signinSchema, signupSchema, updateSchema } from "../validation";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const router = Router();
const prisma = new PrismaClient();

router.post("/signup", async (req: Request, res: Response) => {
  const parsedValue = signupSchema.safeParse(req.body);
  if (!parsedValue.success) {
    console.log("success: ", parsedValue.success);
    console.log("data", parsedValue.data);
    console.log(req.body);
    return res.status(400).json({
      message: "invalid inputs",
    });
  }

  try {
    const user = await prisma.user.create({
      data: parsedValue.data,
    });
    console.log(user);

    const token = jwt.sign({ user_id: user.id }, JWT_SECRET);
    res.status(200).send({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const parsedValue = signinSchema.safeParse(req.body);
  if (!parsedValue.success) {
    console.log("success: ", parsedValue.success);
    console.log("data", parsedValue.data);
    console.log("data", parsedValue.error);
    console.log(req.body);
    return res.status(400).json({
      message: "invalid inputs",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: parsedValue.data.username,
      },
    });
    const token = jwt.sign({ user_id: user?.id }, JWT_SECRET);
    res.status(200).send({
      message: "Signin successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.put("/update", authMiddleware, async (req: Request, res: Response) => {
  const parsedValue = updateSchema.safeParse(req.body);
  if (!parsedValue.success) {
    console.log("success: ", parsedValue.success);
    console.log("data", parsedValue.data);
    console.log("data", parsedValue.error);
    console.log(req.body);
    return res.status(400).json({
      message: "invalid inputs",
    });
  }
  try {
    delete req.body.username;
    const updatedUser = await prisma.user.update({
      where: { id: req.body.user_id },
      data: parsedValue.data,
    });

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
export default router;
