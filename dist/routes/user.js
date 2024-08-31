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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const validation_1 = require("../validation");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedValue = validation_1.signupSchema.safeParse(req.body);
    if (!parsedValue.success) {
        console.log("success: ", parsedValue.success);
        console.log("data", parsedValue.data);
        console.log(req.body);
        return res.status(400).json({
            message: "invalid inputs",
        });
    }
    try {
        const user = yield prisma.user.create({
            data: parsedValue.data,
        });
        console.log(user);
        const token = jsonwebtoken_1.default.sign({ user_id: user.id }, JWT_SECRET);
        res.status(200).send({
            message: "User created successfully",
            token: token,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedValue = validation_1.signinSchema.safeParse(req.body);
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
        const user = yield prisma.user.findUnique({
            where: {
                username: parsedValue.data.username,
            },
        });
        const token = jsonwebtoken_1.default.sign({ user_id: user === null || user === void 0 ? void 0 : user.id }, JWT_SECRET);
        res.status(200).send({
            message: "Signin successfully",
            token: token,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}));
router.post("/update", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedValue = validation_1.updateSchema.safeParse(req.body);
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
        const updatedUser = yield prisma.user.update({
            where: { id: req.body.user_id },
            data: parsedValue.data,
        });
        return res.json({
            message: "User updated successfully",
            user: updatedUser,
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
