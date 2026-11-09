import type { StatisticsGetSummaryResponse } from "@comic-book-catalogue/types/statistics/response";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

import { statisticsService } from "./statistics.service";

const getSummary = async (c: Context): Promise<Response> => {
	const summary = await statisticsService.getSummary();
	return c.json(summary satisfies StatisticsGetSummaryResponse, StatusCodes.OK);
};

export const statisticsController = {
	getSummary,
};
