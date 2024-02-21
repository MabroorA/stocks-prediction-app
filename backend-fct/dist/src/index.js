"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = require('./routes/router');
// dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT ?? 3000;
const cors = require("cors");
// cors access
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
}));
app.use('/', router);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
