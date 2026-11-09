import { categoryRequestValidator } from "@comic-book-catalogue/types/category/request";
import { categoryResponseValidator } from "@comic-book-catalogue/types/category/response";
import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";

import { authMiddleware } from "../../middleware/auth.middleware";
import { categoryController } from "./category.controller";

export const categoryRoutes = new Hono();

// Get all categories
categoryRoutes.get(
	"/",
	describeRoute({
		tags: ["Category"],
		summary: "Get all categories",
		description: "Returns all book categories",
		responses: {
			200: {
				description: "List of categories",
				content: {
					"application/json": {
						schema: resolver(categoryResponseValidator.getAll),
					},
				},
			},
		},
	}),
	validator("query", categoryRequestValidator.getAll),
	authMiddleware,
	async (c) => {
		return categoryController.getAll(c, c.req.valid("query"));
	},
);

// Get a category by id
categoryRoutes.get(
	"/:id",
	describeRoute({
		tags: ["Category"],
		summary: "Get a category by id",
		description: "Returns the details of a single category",
		responses: {
			200: {
				description: "Category details",
				content: {
					"application/json": {
						schema: resolver(categoryResponseValidator.getById),
					},
				},
			},
		},
	}),
	validator("param", categoryRequestValidator.getById),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return categoryController.getById(c, id);
	},
);

// Create a category
categoryRoutes.post(
	"/",
	describeRoute({
		tags: ["Category"],
		summary: "Create a category",
		description: "Adds a new book category",
		responses: {
			201: {
				description: "Created category",
				content: {
					"application/json": {
						schema: resolver(categoryResponseValidator.create),
					},
				},
			},
		},
	}),
	validator("json", categoryRequestValidator.create),
	authMiddleware,
	async (c) => {
		return categoryController.create(c, c.req.valid("json"));
	},
);

// Update a category
categoryRoutes.patch(
	"/:id",
	describeRoute({
		tags: ["Category"],
		summary: "Update a category",
		description: "Modifies an existing book category",
		responses: {
			200: {
				description: "Updated category",
				content: {
					"application/json": {
						schema: resolver(categoryResponseValidator.update),
					},
				},
			},
		},
	}),
	validator("param", categoryRequestValidator.getById),
	validator("json", categoryRequestValidator.update),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return categoryController.update(c, id, c.req.valid("json"));
	},
);

// Remove a category
categoryRoutes.delete(
	"/:id",
	describeRoute({
		tags: ["Category"],
		summary: "Remove a category",
		description: "Removes a book category",
		responses: {
			200: {
				description: "Removed category id",
				content: {
					"application/json": {
						schema: resolver(categoryResponseValidator.remove),
					},
				},
			},
		},
	}),
	validator("param", categoryRequestValidator.remove),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return categoryController.remove(c, id);
	},
);
