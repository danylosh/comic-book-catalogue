import type { z } from "zod";

import type { statisticsRequestValidator } from "./statistics.validator";

export type StatisticsGetSummaryRequest = z.infer<
	typeof statisticsRequestValidator.getSummary
>;
