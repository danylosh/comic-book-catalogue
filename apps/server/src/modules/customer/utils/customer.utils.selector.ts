import type { Prisma } from "@comic-book-catalogue/db";

const getAllSelector = () =>
	({
		id: true,
		firstName: true,
		lastName: true,
		email: true,
		phoneNumber: true,
		membership: true,
		_count: {
			select: {
				orders: true,
			},
		},
		createdAt: true,
		updatedAt: true,
	}) satisfies Prisma.CustomerSelect;

const getByIdSelector = getAllSelector;

export const customerSelector = {
	getAllSelector,
	getByIdSelector,
};
