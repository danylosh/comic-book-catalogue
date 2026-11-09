import type { OrderStatus, Prisma } from "@comic-book-catalogue/db";
import type {
	OrderFindManyInput,
	OrderGetAllResult,
	OrderRecord,
} from "@comic-book-catalogue/types/order/repository";

import { db } from "../../db";
import { orderSelector } from "./utils/order.utils.selector";

const getAll = async (
	input: OrderFindManyInput = {},
): Promise<OrderGetAllResult> => {
	const [orders, total] = await Promise.all([
		db.order.findMany({
			...input,
			select: orderSelector.getAllSelector(),
		}),
		db.order.count({ where: input.where }),
	]);

	return { orders, total };
};

const getById = async (
	where: Prisma.OrderWhereUniqueInput,
): Promise<OrderRecord | null> => {
	return db.order.findUnique({
		where,
		select: orderSelector.getByIdSelector(),
	});
};

const create = async (data: Prisma.OrderCreateInput): Promise<OrderRecord> => {
	return db.order.create({
		data,
		select: orderSelector.getByIdSelector(),
	});
};

const updateStatus = async (
	where: Prisma.OrderWhereUniqueInput,
	status: OrderStatus,
): Promise<OrderRecord> => {
	return db.order.update({
		where,
		data: { status },
		select: orderSelector.getByIdSelector(),
	});
};

export const orderRepository = {
	getAll,
	getById,
	create,
	updateStatus,
};
