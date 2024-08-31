import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import authMiddleware from "../middleware/middleware";
import { todoSchema, updateTodoSchema } from "../validation";
const router = Router();

router.use(authMiddleware);

const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  const todos = await prisma.todos.findMany();
  res.status(200).json({
    todos: todos,
  });
});

router.post("/create", async (req: Request, res: Response) => {
  console.log("user id ", req.body.user_id);
  const parsedValue = todoSchema.safeParse(req.body);
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
    const { title, description } = req.body;
    const user_id = req.body.user_id;
    console.log(user_id);
    const todo = await prisma.todos.create({
      data: {
        title,
        description,
        user: { connect: { id: user_id } },
      },
    });
    res.status(200).send({
      message: "todo created successfully",
      todo: todo,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const parsedValue = updateTodoSchema.safeParse(req.body);
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
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid id parameter",
      });
    }
    console.log("id", id);
    const updatedTodo = await prisma.todos.update({
      where: { id: id },
      data: parsedValue.data,
    });

    return res.json({
      message: "Todo updated successfully",
      user: updatedTodo,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
