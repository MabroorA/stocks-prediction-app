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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search_ticker = exports.Exponential_Moving_Avg = void 0;
function daily_AvgPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        const API_KEY = process.env.API_KEY;
        const request = yield fetch("https://api.twelvedata.com/avgprice?apikey=0cedfa55583c4f2da1f7985dd27c48b1&interval=1day&symbol=NVDA&country=US&format=JSON");
        const response = yield request.json();
        return response;
    });
}
exports.default = daily_AvgPrice;
function Exponential_Moving_Avg() {
    return __awaiter(this, void 0, void 0, function* () {
        const API_KEY = process.env.Poly_API_KEY;
        const request = yield fetch("https://api.polygon.io/v1/indicators/ema/AAPL?timespan=hour&adjusted=true&window=50&series_type=close&order=desc&limit=5000&apiKey=UyzPkn5wTGhDq7aauKltPyTyNburS6FC");
        const response = yield request.json();
        return response;
    });
}
exports.Exponential_Moving_Avg = Exponential_Moving_Avg;
// searching with Company/ticker name
function Search_ticker(ticker) {
    return __awaiter(this, void 0, void 0, function* () {
        const API_KEY = process.env.Poly_API_KEY;
        const request = yield fetch(`https://api.polygon.io/v3/reference/tickers?active=true&apiKey=${API_KEY}&ticker=${ticker}`);
        const response = yield request.json();
        return response;
    });
}
exports.Search_ticker = Search_ticker;
