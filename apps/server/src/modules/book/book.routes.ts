import { bookRequestValidator } from "@comic-book-catalogue/types/book/request";
import { bookResponseValidator } from "@comic-book-catalogue/types/book/response";
import { Hono } from "hono";
import { describeRoute, resolver, validator } from "hono-openapi";

import { authMiddleware } from "../../middleware/auth.middleware";
import { bookController } from "./book.controller";

export const bookRoutes = new Hono();

// Get all books
bookRoutes.get(
	"/",
	describeRoute({
		tags: ["Book"],
		summary: "Get all books",
		description: "Returns a filtered, paginated list of comic books",
		responses: {
			200: {
				description: "List of comic books",
				content: {
					"application/json": {
						schema: resolver(bookResponseValidator.getAll),
					},
				},
			},
		},
	}),
	validator("query", bookRequestValidator.getAll),
	authMiddleware,
	async (c) => {
		return bookController.getAll(c, c.req.valid("query"));
	},
);

// Get a book by id
bookRoutes.get(
	"/:id",
	describeRoute({
		tags: ["Book"],
		summary: "Get a book by id",
		description: "Returns the details of a single comic book",
		responses: {
			200: {
				description: "Comic book details",
				content: {
					"application/json": {
						schema: resolver(bookResponseValidator.getById),
					},
				},
			},
		},
	}),
	validator("param", bookRequestValidator.getById),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return bookController.getById(c, id);
	},
);

// Create a book
bookRoutes.post(
	"/",
	describeRoute({
		tags: ["Book"],
		summary: "Create a book",
		description: "Adds a new comic book to the catalogue",
		responses: {
			201: {
				description: "Created comic book",
				content: {
					"application/json": {
						schema: resolver(bookResponseValidator.create),
					},
				},
			},
		},
	}),
	validator("json", bookRequestValidator.create),
	authMiddleware,
	async (c) => {
		return bookController.create(c, c.req.valid("json"));
	},
);

// Update a book
bookRoutes.patch(
	"/:id",
	describeRoute({
		tags: ["Book"],
		summary: "Update a book",
		description: "Modifies an existing comic book",
		responses: {
			200: {
				description: "Updated comic book",
				content: {
					"application/json": {
						schema: resolver(bookResponseValidator.update),
					},
				},
			},
		},
	}),
	validator("param", bookRequestValidator.getById),
	validator("json", bookRequestValidator.update),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return bookController.update(c, id, c.req.valid("json"));
	},
);

// Remove a book
bookRoutes.delete(
	"/:id",
	describeRoute({
		tags: ["Book"],
		summary: "Remove a book",
		description: "Removes a comic book from the catalogue",
		responses: {
			200: {
				description: "Removed comic book id",
				content: {
					"application/json": {
						schema: resolver(bookResponseValidator.remove),
					},
				},
			},
		},
	}),
	validator("param", bookRequestValidator.remove),
	authMiddleware,
	async (c) => {
		const { id } = c.req.valid("param");
		return bookController.remove(c, id);
	},
);
