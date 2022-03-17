import express, { Application, Request, Response } from "express";
import products from "./products.json";
import cart from "./cart.json";
import cors from "cors";
import fetch from "node-fetch";

interface Item {
	id: number;
	title: string;
	category: string;
	price: number;
	quantity: number;
	image: string;
	description: string;
	rating: {
		rate: number;
		count: number;
	};
}

const cartItems: Item[] = cart;

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
		const product = { ...req.body, quantity: 1 };
		const productExist = cartItems.find((item) => item.id === product.id);

		if (cartItems.length < 1 || !productExist) {
			cartItems.push(product);
		} else {
			for (let item of cartItems) {
				if (item.id === product.id) {
					item.quantity++;
					break;
				}
			}
		}
		res.json(cartItems);
	} catch (error) {
		console.log(error);
	}
});

// ***********
// NOT WORKING
// ***********

app.post("/api/cart", (req: Request, res: Response) => {
	try {
		const id: number = req.body.id;
		const product = req.body;

		const options = {
			method: "PUT",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product),
		};

		fetch(`http://localhost:4000/api/cart/${id}`, options)
			.then((data) => data.json())
			.then((result) => res.json(result))
			.catch((err) => res.json(err));
	} catch (error) {
		console.log(error);
	}
});

app.listen(4000, () => console.log("server running"));
