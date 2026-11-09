import type { Prisma } from "@comic-book-catalogue/db";

const getAllSelector = () =>
	({
		id: true,
		name: true,
		_count: {
			select: {
				books: true,
			},
		},
	}) satisfies Prisma.CategorySelect;

const getByIdSelector = getAllSelector;

export const categorySelector = {
	getAllSelector,
	getByIdSelector,
};
