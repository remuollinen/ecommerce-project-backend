import express, { Application, Request, Response } from "express";
import products from "./products.json";
import cart from "./cart.json";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req: Request, res: Response) => {
	try {
		res.send(products);
	} catch (error) {
		console.log(error);
	}
});
app.get("/api/products/:id", (req: Request, res: Response) => {
	try {
		const id: number = +req.params.id;
		const product: object | undefined = products.find(
			(product) => product.id === id
		);
		res.send(product);
	} catch (error) {
		console.log(error);
	}
});

app.get("/api/cart", (req: Request, res: Response) => {
	try {
		res.send(cart);
	} catch (error) {
		console.log(error);
	}
});
app.post("/api/cart", (req: Request, res: Response) => {
	try {
		cart.push(req.body);
		res.send(cart);
	} catch (error) {
		console.log(error);
	}
});
app.listen(4000, () => console.log("server running"));
