import type { z } from "zod";

import type { statisticsResponseValidator } from "./statistics.validator";

export type StatisticsGetSummaryResponse = z.infer<
	typeof statisticsResponseValidator.getSummary
>;
