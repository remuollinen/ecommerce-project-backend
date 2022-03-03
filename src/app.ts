import express, { Application, Request, Response } from "express";
import products from "./products.json";
import cors from "cors";

const app: Application = express();

app.use(cors());
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

app.listen(4000, () => console.log("server running"));
