import type { Prisma } from "@comic-book-catalogue/db";

export type OrderRecord = Prisma.OrderGetPayload<{
	select: {
		id: true;
		orderNumber: true;
		status: true;
		orderDate: true;
		totalPrice: true;
		customer: {
			select: {
				id: true;
				firstName: true;
				lastName: true;
				email: true;
			};
		};
		items: {
			select: {
				id: true;
				quantity: true;
				unitPrice: true;
				book: {
					select: {
						id: true;
						title: true;
						author: true;
						price: true;
					};
				};
			};
		};
		createdAt: true;
		updatedAt: true;
	};
}>;

export type OrderFindManyInput = Pick<
	Prisma.OrderFindManyArgs,
	"where" | "orderBy" | "skip" | "take"
>;

export type OrderGetAllResult = {
	orders: OrderRecord[];
	total: number;
};
