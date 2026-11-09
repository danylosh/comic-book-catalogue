import type { StatisticsSummaryData } from "@comic-book-catalogue/types/statistics/repository";

import { db } from "../../db";

const getSummaryData = async (): Promise<StatisticsSummaryData> => {
	const [totalBooks, totalCustomers, totalOrders, books] = await Promise.all([
		db.book.count(),
		db.customer.count(),
		db.order.count(),
		db.book.findMany({
			select: {
				price: true,
				stock: true,
			},
		}),
	]);

	return {
		totalBooks,
		totalCustomers,
		totalOrders,
		books,
	};
};

export const statisticsRepository = {
	getSummaryData,
};
