import { openAPIRouteHandler } from "hono-openapi";

import { apiRoutes } from "./api.routes";

export const openApiRoutes = openAPIRouteHandler(apiRoutes, {
	documentation: {
		info: {
			title: "Comic Book Catalogue API",
			version: "1.0.0",
			description:
				"REST API for managing comic books, customers, orders and catalogue statistics.",
		},
		servers: [
			{
				url: "/api",
			},
		],
		tags: [
			{ name: "Book", description: "Comic book catalogue management" },
			{ name: "Category", description: "Comic book category management" },
			{ name: "Customer", description: "Customer management" },
			{ name: "Order", description: "Order management" },
			{ name: "Statistics", description: "Catalogue summary information" },
		],
	},
});
