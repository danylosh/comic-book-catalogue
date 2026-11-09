import type { z } from "zod";

import type { orderResponseValidator } from "./order.validator";

export type OrderGetAllResponse = z.infer<typeof orderResponseValidator.getAll>;
export type OrderGetByIdResponse = z.infer<
	typeof orderResponseValidator.getById
>;
export type OrderCreateResponse = z.infer<typeof orderResponseValidator.create>;
export type OrderUpdateStatusResponse = z.infer<
	typeof orderResponseValidator.updateStatus
>;
