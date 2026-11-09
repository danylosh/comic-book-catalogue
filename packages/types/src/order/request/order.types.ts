import type { z } from "zod";

import type { orderRequestValidator } from "./order.validator";

export type OrderGetAllRequest = z.infer<typeof orderRequestValidator.getAll>;
export type OrderGetByIdRequest = z.infer<typeof orderRequestValidator.getById>;
export type OrderCreateRequest = z.infer<typeof orderRequestValidator.create>;
export type OrderUpdateStatusRequest = z.infer<
	typeof orderRequestValidator.updateStatus
>;
