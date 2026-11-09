import type { Prisma } from "@comic-book-catalogue/db";

const getAllSelector = () =>
	({
		id: true,
		title: true,
		author: true,
		publisher: true,
		publicationYear: true,
		condition: true,
		price: true,
		stock: true,
		category: {
			select: {
				id: true,
				name: true,
			},
		},
		createdAt: true,
		updatedAt: true,
	}) satisfies Prisma.BookSelect;

const getByIdSelector = getAllSelector;

export const bookSelector = {
	getAllSelector,
	getByIdSelector,
};
