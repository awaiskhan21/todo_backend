import { Router } from "express";
import todoRouter from "./todos";
import userRouter from "./user";
const router = Router();

router.use("/user", userRouter);
router.use("/todo", todoRouter);

export default router;
