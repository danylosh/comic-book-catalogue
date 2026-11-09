import type { z } from "zod";

import type { categoryResponseValidator } from "./category.validator";

export type CategoryGetAllResponse = z.infer<
	typeof categoryResponseValidator.getAll
>;
export type CategoryGetByIdResponse = z.infer<
	typeof categoryResponseValidator.getById
>;
export type CategoryCreateResponse = z.infer<
	typeof categoryResponseValidator.create
>;
export type CategoryUpdateResponse = z.infer<
	typeof categoryResponseValidator.update
>;
export type CategoryRemoveResponse = z.infer<
	typeof categoryResponseValidator.remove
>;
