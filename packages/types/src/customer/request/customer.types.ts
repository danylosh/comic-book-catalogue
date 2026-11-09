import type { z } from "zod";

import type { customerRequestValidator } from "./customer.validator";

export type CustomerGetAllRequest = z.infer<
	typeof customerRequestValidator.getAll
>;
export type CustomerGetByIdRequest = z.infer<
	typeof customerRequestValidator.getById
>;
export type CustomerCreateRequest = z.infer<
	typeof customerRequestValidator.create
>;
export type CustomerUpdateRequest = z.infer<
	typeof customerRequestValidator.update
>;
export type CustomerRemoveRequest = z.infer<
	typeof customerRequestValidator.remove
>;
