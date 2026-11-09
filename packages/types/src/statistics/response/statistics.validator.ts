import { z } from "zod";

const getSummary = z.object({
	totalBooks: z.number().int().nonnegative(),
	totalCustomers: z.number().int().nonnegative(),
	totalOrders: z.number().int().nonnegative(),
	inventoryValue: z.number().nonnegative(),
});

export const statisticsResponseValidator = {
	getSummary,
};
