import { z } from "zod";

const membershipStatus = z.enum(["NONE", "BASIC", "PREMIUM"]);

const getAll = z.object({
	search: z.string().trim().min(1).optional(),
	membership: membershipStatus.optional(),
	sortBy: z
		.enum(["firstName", "lastName", "email", "createdAt"])
		.default("createdAt"),
	sortOrder: z.enum(["asc", "desc"]).default("desc"),
	page: z.coerce.number().int().positive().default(1),
	pageSize: z.coerce.number().int().positive().max(100).default(20),
});

const getById = z.object({
	id: z.uuid(),
});

const create = z.object({
	firstName: z.string().trim().min(1),
	lastName: z.string().trim().min(1),
	email: z.email(),
	phoneNumber: z.string().trim().min(5),
	membership: membershipStatus.default("NONE"),
});

const update = create.partial();

const remove = z.object({
	id: z.uuid(),
});

export const customerRequestValidator = {
	getAll,
	getById,
	create,
	update,
	remove,
};
