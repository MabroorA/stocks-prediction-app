"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetch_stocks_data_1 = __importStar(require("./data-fetching/fetch-stocks-data"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const cors = require("cors");
// cors access
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
}));
app.get("/", (req, res) => {
    console.log("Server Working");
    res.send("Express + TypeScript Server");
});
app.get("/fetch-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
    try {
        console.log("Calling external API (alpha vantage) ");
        const response = yield (0, fetch_stocks_data_1.default)();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get data");
    }
}));
// Daily api call from alphavantage
app.get("/daily-view", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("RECEIVED A CALL AT FETCH DATA ENDPOINT");
    try {
        console.log("12DATA API called  ");
        const response = yield (0, fetch_stocks_data_1.default)();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get data");
    }
}));
// Exponential_Moving_Avg api call from polygen
app.get("/exponential-moving-avg", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Ploygen API called  ");
        const response = yield (0, fetch_stocks_data_1.Exponential_Moving_Avg)();
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to get data");
    }
}));
// Searching a ticker
// Route to handle ticker search
app.get("/search-ticker", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticker } = req.query; // Get the ticker parameter from the request query
        if (!ticker || typeof ticker !== "string") {
            throw new Error("Ticker parameter is missing or invalid");
        }
        const searchResult = yield (0, fetch_stocks_data_1.Search_ticker)(ticker); // Call the Search_ticker function
        res.send(searchResult);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Failed to search ticker");
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
