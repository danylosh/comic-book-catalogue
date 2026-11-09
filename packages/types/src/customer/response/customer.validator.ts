import { z } from "zod";

const customer = z.object({
	id: z.uuid(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.email(),
	phoneNumber: z.string(),
	membership: z.enum(["NONE", "BASIC", "PREMIUM"]),
	orderCount: z.number().int().nonnegative(),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});

const getAll = z.object({
	items: z.array(customer),
	total: z.number().int().nonnegative(),
	page: z.number().int().positive(),
	pageSize: z.number().int().positive(),
});

const getById = customer;

const create = customer;

const update = customer;

const remove = z.object({
	id: z.uuid(),
});

export const customerResponseValidator = {
	getAll,
	getById,
	create,
	update,
	remove,
};
