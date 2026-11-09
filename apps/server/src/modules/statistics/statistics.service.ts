import type { StatisticsGetSummaryResponse } from "@comic-book-catalogue/types/statistics/response";

// TODO: implement statistics business logic. Inventory value is the sum of
// price * stock across all comic books.
const getSummary = async (): Promise<StatisticsGetSummaryResponse> => {
	throw new Error("statisticsService.getSummary is not implemented");
};

export const statisticsService = {
	getSummary,
};
