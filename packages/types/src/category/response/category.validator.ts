import { z } from "zod";

const category = z.object({
	id: z.uuid(),
	name: z.string(),
	bookCount: z.number().int().nonnegative(),
});

const getAll = z.array(category);

const getById = category;

const create = category;

const update = category;

const remove = z.object({
	id: z.uuid(),
});

export const categoryResponseValidator = {
	getAll,
	getById,
	create,
	update,
	remove,
};
