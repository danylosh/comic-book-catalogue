import { Prisma } from "@comic-book-catalogue/db";
import type {
	OrderCreateRequest,
	OrderGetAllRequest,
	OrderUpdateStatusRequest,
} from "@comic-book-catalogue/types/order/request";
import type {
	OrderCreateResponse,
	OrderGetAllResponse,
	OrderGetByIdResponse,
	OrderUpdateStatusResponse,
} from "@comic-book-catalogue/types/order/response";

import { bookRepository } from "../book/book.repository";
import { orderRepository } from "./order.repository";
import { orderFormatter } from "./utils/order.utils.formatter";

const getAll = async (
	input: OrderGetAllRequest,
): Promise<OrderGetAllResponse> => {
	const where: Prisma.OrderWhereInput = {};

	if (input.search) {
		const numericSearch = Number(input.search);

		const searchConditions: Prisma.OrderWhereInput[] = [
			{
				customer: {
					firstName: { contains: input.search, mode: "insensitive" },
				},
			},
			{
				customer: {
					lastName: { contains: input.search, mode: "insensitive" },
				},
			},
			{
				items: {
					some: {
						book: {
							title: { contains: input.search, mode: "insensitive" },
						},
					},
				},
			},
		];

		if (Number.isInteger(numericSearch) && numericSearch > 0) {
			searchConditions.push({ orderNumber: numericSearch });
		}

		where.OR = searchConditions;
	}

	if (input.customerId) {
		where.customerId = input.customerId;
	}

	if (input.status) {
		where.status = input.status;
	}

	if (input.dateFrom !== undefined || input.dateTo !== undefined) {
		where.orderDate = {
			...(input.dateFrom !== undefined ? { gte: input.dateFrom } : {}),
			...(input.dateTo !== undefined ? { lte: input.dateTo } : {}),
		};
	}

	const orderByMap: Record<
		OrderGetAllRequest["sortBy"],
		Prisma.OrderOrderByWithRelationInput
	> = {
		orderNumber: { orderNumber: input.sortOrder },
		orderDate: { orderDate: input.sortOrder },
		totalPrice: { totalPrice: input.sortOrder },
	};

	const { orders, total } = await orderRepository.getAll({
		where,
		orderBy: orderByMap[input.sortBy],
		skip: (input.page - 1) * input.pageSize,
		take: input.pageSize,
	});

	return orderFormatter.getAllFormatter(
		orders,
		total,
		input.page,
		input.pageSize,
	);
};

const getById = async (id: string): Promise<OrderGetByIdResponse> => {
	const order = await orderRepository.getById({ id });

	if (!order) {
		throw new Error("Order not found");
	}

	return orderFormatter.getByIdFormatter(order);
};

const create = async (
	input: OrderCreateRequest,
	createdById?: string,
): Promise<OrderCreateResponse> => {
	const quantitiesByBookId = new Map<string, number>();

	for (const item of input.items) {
		quantitiesByBookId.set(
			item.bookId,
			(quantitiesByBookId.get(item.bookId) ?? 0) + item.quantity,
		);
	}

	const bookIds = [...quantitiesByBookId.keys()];

	// Customer existence is enforced by the order's foreign key constraint.
	const books = await bookRepository.getPricesByIds(bookIds);
	const booksById = new Map(books.map((book) => [book.id, book]));
	let totalPrice = new Prisma.Decimal(0);

	const orderItems = [...quantitiesByBookId.entries()].map(
		([bookId, quantity]) => {
			const book = booksById.get(bookId);

			if (!book) {
				throw new Error(`Book not found: ${bookId}`);
			}

			totalPrice = totalPrice.plus(book.price.mul(quantity));

			return {
				bookId,
				quantity,
				unitPrice: book.price,
			};
		},
	);

	const data: Prisma.OrderCreateInput = {
		customer: { connect: { id: input.customerId } },
		...(createdById ? { createdBy: { connect: { id: createdById } } } : {}),
		totalPrice,
		items: {
			create: orderItems.map((item) => ({
				book: { connect: { id: item.bookId } },
				quantity: item.quantity,
				unitPrice: item.unitPrice,
			})),
		},
	};

	const order = await orderRepository.create(data);

	return orderFormatter.createFormatter(order);
};

const updateStatus = async (
	id: string,
	input: OrderUpdateStatusRequest,
): Promise<OrderUpdateStatusResponse> => {
	const order = await orderRepository.updateStatus({ id }, input.status);

	return orderFormatter.updateStatusFormatter(order);
};

export const orderService = {
	getAll,
	getById,
	create,
	updateStatus,
};
