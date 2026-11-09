import { z } from "zod";

const orderItem = z.object({
	id: z.uuid(),
	book: z.object({
		id: z.uuid(),
		title: z.string(),
		author: z.string(),
		price: z.number().nonnegative(),
	}),
	quantity: z.number().int().positive(),
	unitPrice: z.number().nonnegative(),
	subtotal: z.number().nonnegative(),
});

const order = z.object({
	id: z.uuid(),
	orderNumber: z.number().int().positive(),
	customer: z.object({
		id: z.uuid(),
		firstName: z.string(),
		lastName: z.string(),
		email: z.email(),
	}),
	items: z.array(orderItem),
	status: z.enum(["NEW", "PROCESSING", "COMPLETED", "CANCELLED"]),
	orderDate: z.iso.datetime(),
	totalPrice: z.number().nonnegative(),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});

const getAll = z.object({
	items: z.array(order),
	total: z.number().int().nonnegative(),
	page: z.number().int().positive(),
	pageSize: z.number().int().positive(),
});

const getById = order;

const create = order;

const updateStatus = order;

export const orderResponseValidator = {
	getAll,
	getById,
	create,
	updateStatus,
};
