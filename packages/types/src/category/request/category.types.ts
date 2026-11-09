import type { z } from "zod";

import type { categoryRequestValidator } from "./category.validator";

export type CategoryGetAllRequest = z.infer<
	typeof categoryRequestValidator.getAll
>;
export type CategoryGetByIdRequest = z.infer<
	typeof categoryRequestValidator.getById
>;
export type CategoryCreateRequest = z.infer<
	typeof categoryRequestValidator.create
>;
export type CategoryUpdateRequest = z.infer<
	typeof categoryRequestValidator.update
>;
export type CategoryRemoveRequest = z.infer<
	typeof categoryRequestValidator.remove
>;
