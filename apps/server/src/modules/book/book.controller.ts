import type {
	BookCreateRequest,
	BookGetAllRequest,
	BookUpdateRequest,
} from "@comic-book-catalogue/types/book/request";
import type {
	BookCreateResponse,
	BookGetAllResponse,
	BookGetByIdResponse,
	BookRemoveResponse,
	BookUpdateResponse,
} from "@comic-book-catalogue/types/book/response";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

import { bookService } from "./book.service";

export const bookController = {
	async getAll(c: Context, query: BookGetAllRequest) {
		const books = await bookService.getAll(query);
		return c.json(books satisfies BookGetAllResponse, StatusCodes.OK);
	},

	async getById(c: Context, id: string) {
		const book = await bookService.getById(id);
		return c.json(book satisfies BookGetByIdResponse, StatusCodes.OK);
	},

	async create(c: Context, body: BookCreateRequest) {
		const book = await bookService.create(body);
		return c.json(book satisfies BookCreateResponse, StatusCodes.CREATED);
	},

	async update(c: Context, id: string, body: BookUpdateRequest) {
		const book = await bookService.update(id, body);
		return c.json(book satisfies BookUpdateResponse, StatusCodes.OK);
	},

	async remove(c: Context, id: string) {
		const result = await bookService.remove(id);
		return c.json(result satisfies BookRemoveResponse, StatusCodes.OK);
	},
};
