import { statisticsResponseValidator } from "@comic-book-catalogue/types/statistics/response";
import { Hono } from "hono";
import { describeRoute, resolver } from "hono-openapi";

import { authMiddleware } from "../../middleware/auth.middleware";
import { statisticsController } from "./statistics.controller";

export const statisticsRoutes = new Hono();

// Get catalogue summary
statisticsRoutes.get(
	"/summary",
	describeRoute({
		tags: ["Statistics"],
		summary: "Get catalogue summary",
		description:
			"Returns totals for books, customers, orders and inventory value",
		responses: {
			200: {
				description: "Catalogue summary",
				content: {
					"application/json": {
						schema: resolver(statisticsResponseValidator.getSummary),
					},
				},
			},
		},
	}),
	authMiddleware,
	async (c) => {
		return statisticsController.getSummary(c);
	},
);
