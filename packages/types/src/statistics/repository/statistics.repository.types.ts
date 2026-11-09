import type { Prisma } from "@comic-book-catalogue/db";

export type StatisticsSummaryBook = Prisma.BookGetPayload<{
	select: {
		price: true;
		stock: true;
	};
}>;

export type StatisticsSummaryData = {
	totalBooks: number;
	totalCustomers: number;
	totalOrders: number;
	books: StatisticsSummaryBook[];
};
