import type { z } from "zod";

import type { customerResponseValidator } from "./customer.validator";

export type CustomerGetAllResponse = z.infer<
	typeof customerResponseValidator.getAll
>;
export type CustomerGetByIdResponse = z.infer<
	typeof customerResponseValidator.getById
>;
export type CustomerCreateResponse = z.infer<
	typeof customerResponseValidator.create
>;
export type CustomerUpdateResponse = z.infer<
	typeof customerResponseValidator.update
>;
export type CustomerRemoveResponse = z.infer<
	typeof customerResponseValidator.remove
>;
