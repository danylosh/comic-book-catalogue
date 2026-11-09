import { customerRequestValidator } from "@comic-book-catalogue/types/customer/request";
import { customerResponseValidator } from "@comic-book-catalogue/types/customer/response";
import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";

import { authMiddleware } from "../../middleware/auth.middleware";
import { customerController } from "./customer.controller";

export const customerRoutes = new Hono();

// Get all customers
customerRoutes.get(
	"/",
	describeRoute({
		tags: ["Customer"],
		summary: "Get all customers",
		description: "Returns a filtered, paginated list of customers",
		responses: {
			200: {
				description: "List of customers",
				content: {
					"application/json": {
						schema: resolver(customerResponseValidator.getAll),
					},
				},
			},
		},
	}),
	validator("query", customerRequestValidator.getAll),
	authMiddleware,
	async (c) => {
		return customerController.getAll(c, c.req.valid("query"));
	},
);

// Get a customer by id
customerRoutes.get(
	"/:id",
	describeRoute({
		tags: ["Customer"],
		summary: "Get a customer by id",
		description: "Returns the details of a single customer",
		responses: {
			200: {
				description: "Customer details",
				content: {
					"application/json": {
						schema: resolver(customerResponseValidator.getById),
					},
				},
			},
		},
	}),
	validator("param", customerRequestValidator.getById),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return customerController.getById(c, id);
	},
);

// Create a customer
customerRoutes.post(
	"/",
	describeRoute({
		tags: ["Customer"],
		summary: "Create a customer",
		description: "Adds a new customer to the clientele",
		responses: {
			201: {
				description: "Created customer",
				content: {
					"application/json": {
						schema: resolver(customerResponseValidator.create),
					},
				},
			},
		},
	}),
	validator("json", customerRequestValidator.create),
	authMiddleware,
	async (c) => {
		return customerController.create(c, c.req.valid("json"));
	},
);

// Update a customer
customerRoutes.patch(
	"/:id",
	describeRoute({
		tags: ["Customer"],
		summary: "Update a customer",
		description: "Modifies an existing customer",
		responses: {
			200: {
				description: "Updated customer",
				content: {
					"application/json": {
						schema: resolver(customerResponseValidator.update),
					},
				},
			},
		},
	}),
	validator("param", customerRequestValidator.getById),
	validator("json", customerRequestValidator.update),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return customerController.update(c, id, c.req.valid("json"));
	},
);

// Remove a customer
customerRoutes.delete(
	"/:id",
	describeRoute({
		tags: ["Customer"],
		summary: "Remove a customer",
		description: "Removes a customer from the clientele",
		responses: {
			200: {
				description: "Removed customer id",
				content: {
					"application/json": {
						schema: resolver(customerResponseValidator.remove),
					},
				},
			},
		},
	}),
	validator("param", customerRequestValidator.remove),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return customerController.remove(c, id);
	},
);
