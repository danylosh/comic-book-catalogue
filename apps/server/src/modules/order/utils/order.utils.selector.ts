import type { Prisma } from "@comic-book-catalogue/db";

const getAllSelector = () =>
	({
		id: true,
		orderNumber: true,
		status: true,
		orderDate: true,
		totalPrice: true,
		customer: {
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
			},
		},
		items: {
			select: {
				id: true,
				quantity: true,
				unitPrice: true,
				book: {
					select: {
						id: true,
						title: true,
						author: true,
						price: true,
					},
				},
			},
		},
		createdAt: true,
		updatedAt: true,
	}) satisfies Prisma.OrderSelect;

const getByIdSelector = getAllSelector;

export const orderSelector = {
	getAllSelector,
	getByIdSelector,
};
