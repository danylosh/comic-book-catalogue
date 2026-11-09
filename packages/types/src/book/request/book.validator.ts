import { z } from "zod";

const bookCondition = z.enum([
	"MINT",
	"NEAR_MINT",
	"VERY_FINE",
	"FINE",
	"VERY_GOOD",
	"GOOD",
	"FAIR",
	"POOR",
]);

const getAll = z.object({
	search: z.string().trim().min(1).optional(),
	categoryId: z.uuid().optional(),
	condition: bookCondition.optional(),
	minPrice: z.coerce.number().nonnegative().optional(),
	maxPrice: z.coerce.number().nonnegative().optional(),
	sortBy: z
		.enum(["title", "publicationYear", "price", "createdAt"])
		.default("createdAt"),
	sortOrder: z.enum(["asc", "desc"]).default("desc"),
	page: z.coerce.number().int().positive().default(1),
	pageSize: z.coerce.number().int().positive().max(100).default(20),
});

const getById = z.object({
	id: z.uuid(),
});

const create = z.object({
	title: z.string().trim().min(1),
	author: z.string().trim().min(1),
	publisher: z.string().trim().min(1),
	publicationYear: z
		.number()
		.int()
		.min(1900)
		.max(new Date().getFullYear() + 1),
	condition: bookCondition.default("GOOD"),
	price: z.number().nonnegative(),
	stock: z.number().int().nonnegative().default(0),
	categoryId: z.uuid(),
});

const update = create.partial();

const remove = z.object({
	id: z.uuid(),
});

export const bookRequestValidator = {
	getAll,
	getById,
	create,
	update,
	remove,
};
