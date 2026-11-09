import type { Prisma } from "@comic-book-catalogue/db";

export type BookRecord = Prisma.BookGetPayload<{
	select: {
		id: true;
		title: true;
		author: true;
		publisher: true;
		publicationYear: true;
		condition: true;
		price: true;
		stock: true;
		category: {
			select: {
				id: true;
				name: true;
			};
		};
		createdAt: true;
		updatedAt: true;
	};
}>;

export type BookFindManyInput = Pick<
	Prisma.BookFindManyArgs,
	"where" | "orderBy" | "skip" | "take"
>;

export type BookPriceRecord = Prisma.BookGetPayload<{
	select: {
		id: true;
		price: true;
	};
}>;

export type BookGetAllResult = {
	books: BookRecord[];
	total: number;
};
