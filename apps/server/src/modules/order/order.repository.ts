import type { Prisma } from "@comic-book-catalogue/db";

// TODO: implement order data access. Order creation must compute the total
// price from the order items inside a transaction.
export const orderRepository = {
	getAll: async (_where: Prisma.OrderWhereInput) => {
		throw new Error("orderRepository.getAll is not implemented");
	},
	getById: async (_id: string) => {
		throw new Error("orderRepository.getById is not implemented");
	},
	create: async (_data: Prisma.OrderCreateInput) => {
		throw new Error("orderRepository.create is not implemented");
	},
	updateStatus: async (_id: string, _status: Prisma.OrderUpdateInput) => {
		throw new Error("orderRepository.updateStatus is not implemented");
	},
};
