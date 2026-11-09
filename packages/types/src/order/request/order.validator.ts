import { z } from "zod";

const orderStatus = z.enum(["NEW", "PROCESSING", "COMPLETED", "CANCELLED"]);

const getAll = z.object({
	search: z.string().trim().min(1).optional(),
	customerId: z.uuid().optional(),
	status: orderStatus.optional(),
	dateFrom: z.coerce.date().optional(),
	dateTo: z.coerce.date().optional(),
	sortBy: z
		.enum(["orderNumber", "orderDate", "totalPrice"])
		.default("orderDate"),
	sortOrder: z.enum(["asc", "desc"]).default("desc"),
	page: z.coerce.number().int().positive().default(1),
	pageSize: z.coerce.number().int().positive().max(100).default(20),
});

const getById = z.object({
	id: z.uuid(),
});

const create = z.object({
	customerId: z.uuid(),
	items: z
		.array(
			z.object({
				bookId: z.uuid(),
				quantity: z.number().int().positive(),
			}),
		)
		.min(1),
});

const updateStatus = z.object({
	status: orderStatus,
});

export const orderRequestValidator = {
	getAll,
	getById,
	create,
	updateStatus,
};
