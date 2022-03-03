"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_json_1 = __importDefault(require("./products.json"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/api/products", (req, res) => {
    try {
        res.send(products_json_1.default);
    }
    catch (error) {
        console.log(error);
    }
});
app.get("/api/products/:id", (req, res) => {
    try {
        const id = +req.params.id;
        const product = products_json_1.default.find((product) => product.id === id);
        res.send(product);
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(4000, () => console.log("server running"));
