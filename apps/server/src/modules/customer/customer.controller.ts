import type {
	CustomerCreateRequest,
	CustomerGetAllRequest,
	CustomerUpdateRequest,
} from "@comic-book-catalogue/types/customer/request";
import type {
	CustomerCreateResponse,
	CustomerGetAllResponse,
	CustomerGetByIdResponse,
	CustomerRemoveResponse,
	CustomerUpdateResponse,
} from "@comic-book-catalogue/types/customer/response";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

import { customerService } from "./customer.service";

const getAll = async (
	c: Context,
	query: CustomerGetAllRequest,
): Promise<Response> => {
	const customers = await customerService.getAll(query);
	return c.json(customers satisfies CustomerGetAllResponse, StatusCodes.OK);
};

const getById = async (c: Context, id: string): Promise<Response> => {
	const customer = await customerService.getById(id);
	return c.json(customer satisfies CustomerGetByIdResponse, StatusCodes.OK);
};

const create = async (
	c: Context,
	body: CustomerCreateRequest,
): Promise<Response> => {
	const customer = await customerService.create(body);
	return c.json(customer satisfies CustomerCreateResponse, StatusCodes.CREATED);
};

const update = async (
	c: Context,
	id: string,
	body: CustomerUpdateRequest,
): Promise<Response> => {
	const customer = await customerService.update(id, body);
	return c.json(customer satisfies CustomerUpdateResponse, StatusCodes.OK);
};

const remove = async (c: Context, id: string): Promise<Response> => {
	const result = await customerService.remove(id);
	return c.json(result satisfies CustomerRemoveResponse, StatusCodes.OK);
};

export const customerController = {
	getAll,
	getById,
	create,
	update,
	remove,
};
