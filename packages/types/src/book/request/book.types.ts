import type { z } from "zod";

import type { bookRequestValidator } from "./book.validator";

export type BookGetAllRequest = z.infer<typeof bookRequestValidator.getAll>;
export type BookGetByIdRequest = z.infer<typeof bookRequestValidator.getById>;
export type BookCreateRequest = z.infer<typeof bookRequestValidator.create>;
export type BookUpdateRequest = z.infer<typeof bookRequestValidator.update>;
export type BookRemoveRequest = z.infer<typeof bookRequestValidator.remove>;
