"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
router.use(middleware_1.default);
const prisma = new client_1.PrismaClient();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todos.findMany();
    res.status(200).json({
        todos: todos,
    });
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user id ", req.body.user_id);
    const parsedValue = validation_1.todoSchema.safeParse(req.body);
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
        const todo = yield prisma.todos.create({
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
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedValue = validation_1.updateTodoSchema.safeParse(req.body);
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
        const updatedTodo = yield prisma.todos.update({
            where: { id: id },
            data: parsedValue.data,
        });
        return res.json({
            message: "Todo updated successfully",
            user: updatedTodo,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
exports.default = router;
