import { z } from "zod";

const book = z.object({
	id: z.uuid(),
	title: z.string(),
	author: z.string(),
	publisher: z.string(),
	publicationYear: z.number().int(),
	condition: z.enum([
		"MINT",
		"NEAR_MINT",
		"VERY_FINE",
		"FINE",
		"VERY_GOOD",
		"GOOD",
		"FAIR",
		"POOR",
	]),
	price: z.number().nonnegative(),
	stock: z.number().int().nonnegative(),
	category: z.object({
		id: z.uuid(),
		name: z.string(),
	}),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});

const getAll = z.object({
	items: z.array(book),
	total: z.number().int().nonnegative(),
	page: z.number().int().positive(),
	pageSize: z.number().int().positive(),
});

const getById = book;

const create = book;

const update = book;

const remove = z.object({
	id: z.uuid(),
});

export const bookResponseValidator = {
	getAll,
	getById,
	create,
	update,
	remove,
};
