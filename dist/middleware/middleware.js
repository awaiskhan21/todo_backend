"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(403).json({
            message: "issue with authentication",
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.body.user_id = decode.user_id;
        next();
    }
    catch (e) {
        return res.status(403).json({
            message: "Invalid token",
        });
    }
};
exports.default = authMiddleware;
