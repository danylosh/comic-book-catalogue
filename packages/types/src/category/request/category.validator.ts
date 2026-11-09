import { z } from "zod";

const getAll = z.object({
	search: z.string().trim().min(1).optional(),
});

const getById = z.object({
	id: z.uuid(),
});

const create = z.object({
	name: z.string().trim().min(1),
});

const update = create;

const remove = z.object({
	id: z.uuid(),
});

export const categoryRequestValidator = {
	getAll,
	getById,
	create,
	update,
	remove,
};
