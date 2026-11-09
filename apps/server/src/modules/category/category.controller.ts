import type {
	CategoryCreateRequest,
	CategoryGetAllRequest,
	CategoryUpdateRequest,
} from "@comic-book-catalogue/types/category/request";
import type {
	CategoryCreateResponse,
	CategoryGetAllResponse,
	CategoryGetByIdResponse,
	CategoryRemoveResponse,
	CategoryUpdateResponse,
} from "@comic-book-catalogue/types/category/response";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

import { categoryService } from "./category.service";

const getAll = async (
	c: Context,
	query: CategoryGetAllRequest,
): Promise<Response> => {
	const categories = await categoryService.getAll(query);
	return c.json(categories satisfies CategoryGetAllResponse, StatusCodes.OK);
};

const getById = async (c: Context, id: string): Promise<Response> => {
	const category = await categoryService.getById(id);
	return c.json(category satisfies CategoryGetByIdResponse, StatusCodes.OK);
};

const create = async (
	c: Context,
	body: CategoryCreateRequest,
): Promise<Response> => {
	const category = await categoryService.create(body);
	return c.json(category satisfies CategoryCreateResponse, StatusCodes.CREATED);
};

const update = async (
	c: Context,
	id: string,
	body: CategoryUpdateRequest,
): Promise<Response> => {
	const category = await categoryService.update(id, body);
	return c.json(category satisfies CategoryUpdateResponse, StatusCodes.OK);
};

const remove = async (c: Context, id: string): Promise<Response> => {
	const result = await categoryService.remove(id);
	return c.json(result satisfies CategoryRemoveResponse, StatusCodes.OK);
};

export const categoryController = {
	getAll,
	getById,
	create,
	update,
	remove,
};
