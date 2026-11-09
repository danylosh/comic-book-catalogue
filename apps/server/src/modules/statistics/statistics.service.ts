import { Prisma } from "@comic-book-catalogue/db";
import type { StatisticsGetSummaryResponse } from "@comic-book-catalogue/types/statistics/response";

import { statisticsRepository } from "./statistics.repository";

const getSummary = async (): Promise<StatisticsGetSummaryResponse> => {
	const summary = await statisticsRepository.getSummaryData();

	const inventoryValue = summary.books.reduce(
		(total, book) => total.plus(book.price.mul(book.stock)),
		new Prisma.Decimal(0),
	);

	return {
		totalBooks: summary.totalBooks,
		totalCustomers: summary.totalCustomers,
		totalOrders: summary.totalOrders,
		inventoryValue: Number(inventoryValue),
	};
};

export const statisticsService = {
	getSummary,
};
