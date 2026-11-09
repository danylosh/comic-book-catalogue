import type { z } from "zod";

import type { bookResponseValidator } from "./book.validator";

export type BookGetAllResponse = z.infer<typeof bookResponseValidator.getAll>;
export type BookGetByIdResponse = z.infer<typeof bookResponseValidator.getById>;
export type BookCreateResponse = z.infer<typeof bookResponseValidator.create>;
export type BookUpdateResponse = z.infer<typeof bookResponseValidator.update>;
export type BookRemoveResponse = z.infer<typeof bookResponseValidator.remove>;
