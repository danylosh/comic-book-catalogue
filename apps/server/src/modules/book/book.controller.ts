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

const getAll = async (
	c: Context,
	query: BookGetAllRequest,
): Promise<Response> => {
	const books = await bookService.getAll(query);
	return c.json(books satisfies BookGetAllResponse, StatusCodes.OK);
};

const getById = async (c: Context, id: string): Promise<Response> => {
	const book = await bookService.getById(id);
	return c.json(book satisfies BookGetByIdResponse, StatusCodes.OK);
};

const create = async (
	c: Context,
	body: BookCreateRequest,
): Promise<Response> => {
	const book = await bookService.create(body);
	return c.json(book satisfies BookCreateResponse, StatusCodes.CREATED);
};

const update = async (
	c: Context,
	id: string,
	body: BookUpdateRequest,
): Promise<Response> => {
	const book = await bookService.update(id, body);
	return c.json(book satisfies BookUpdateResponse, StatusCodes.OK);
};

const remove = async (c: Context, id: string): Promise<Response> => {
	const result = await bookService.remove(id);
	return c.json(result satisfies BookRemoveResponse, StatusCodes.OK);
};

export const bookController = {
	getAll,
	getById,
	create,
	update,
	remove,
};
