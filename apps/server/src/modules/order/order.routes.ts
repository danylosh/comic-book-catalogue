import { orderRequestValidator } from "@comic-book-catalogue/types/order/request";
import { orderResponseValidator } from "@comic-book-catalogue/types/order/response";
import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";

import { authMiddleware } from "../../middleware/auth.middleware";
import { orderController } from "./order.controller";

export const orderRoutes = new Hono();

// Get all orders
orderRoutes.get(
	"/",
	describeRoute({
		tags: ["Order"],
		summary: "Get all orders",
		description: "Returns a filtered, paginated list of orders",
		responses: {
			200: {
				description: "List of orders",
				content: {
					"application/json": {
						schema: resolver(orderResponseValidator.getAll),
					},
				},
			},
		},
	}),
	validator("query", orderRequestValidator.getAll),
	authMiddleware,
	async (c) => {
		return orderController.getAll(c, c.req.valid("query"));
	},
);

// Get an order by id
orderRoutes.get(
	"/:id",
	describeRoute({
		tags: ["Order"],
		summary: "Get an order by id",
		description: "Returns the details of a single order",
		responses: {
			200: {
				description: "Order details",
				content: {
					"application/json": {
						schema: resolver(orderResponseValidator.getById),
					},
				},
			},
		},
	}),
	validator("param", orderRequestValidator.getById),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return orderController.getById(c, id);
	},
);

// Create an order
orderRoutes.post(
	"/",
	describeRoute({
		tags: ["Order"],
		summary: "Create an order",
		description:
			"Creates an order for a customer and calculates the total price",
		responses: {
			201: {
				description: "Created order",
				content: {
					"application/json": {
						schema: resolver(orderResponseValidator.create),
					},
				},
			},
		},
	}),
	validator("json", orderRequestValidator.create),
	authMiddleware,
	async (c) => {
		return orderController.create(c, c.req.valid("json"));
	},
);

// Update an order status
orderRoutes.patch(
	"/:id/status",
	describeRoute({
		tags: ["Order"],
		summary: "Update an order status",
		description: "Updates the status of an existing order",
		responses: {
			200: {
				description: "Updated order",
				content: {
					"application/json": {
						schema: resolver(orderResponseValidator.updateStatus),
					},
				},
			},
		},
	}),
	validator("param", orderRequestValidator.getById),
	validator("json", orderRequestValidator.updateStatus),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return orderController.updateStatus(c, id, c.req.valid("json"));
	},
);
