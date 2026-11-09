import type { OrderRecord } from "@comic-book-catalogue/types/order/repository";
import type {
	OrderGetAllResponse,
	OrderGetByIdResponse,
} from "@comic-book-catalogue/types/order/response";

const formatOrder = (order: OrderRecord): OrderGetByIdResponse => ({
	id: order.id,
	orderNumber: order.orderNumber,
	customer: order.customer,
	items: order.items.map((item) => {
		const unitPrice = Number(item.unitPrice);

		return {
			id: item.id,
			book: {
				...item.book,
				price: Number(item.book.price),
			},
			quantity: item.quantity,
			unitPrice,
			subtotal: unitPrice * item.quantity,
		};
	}),
	status: order.status,
	orderDate: order.orderDate.toISOString(),
	totalPrice: Number(order.totalPrice),
	createdAt: order.createdAt.toISOString(),
	updatedAt: order.updatedAt.toISOString(),
});

const getAllFormatter = (
	orders: OrderRecord[],
	total: number,
	page: number,
	pageSize: number,
): OrderGetAllResponse => ({
	items: orders.map(formatOrder),
	total,
	page,
	pageSize,
});

const getByIdFormatter = (order: OrderRecord): OrderGetByIdResponse =>
	formatOrder(order);

const createFormatter = (order: OrderRecord): OrderGetByIdResponse =>
	formatOrder(order);

const updateStatusFormatter = (order: OrderRecord): OrderGetByIdResponse =>
	formatOrder(order);

export const orderFormatter = {
	getAllFormatter,
	getByIdFormatter,
	createFormatter,
	updateStatusFormatter,
};
