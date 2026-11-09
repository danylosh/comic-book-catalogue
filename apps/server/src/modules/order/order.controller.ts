import type {
	OrderCreateRequest,
	OrderGetAllRequest,
	OrderUpdateStatusRequest,
} from "@comic-book-catalogue/types/order/request";
import type {
	OrderCreateResponse,
	OrderGetAllResponse,
	OrderGetByIdResponse,
	OrderUpdateStatusResponse,
} from "@comic-book-catalogue/types/order/response";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";

import { orderService } from "./order.service";

const getAll = async (
	c: Context,
	query: OrderGetAllRequest,
): Promise<Response> => {
	const orders = await orderService.getAll(query);
	return c.json(orders satisfies OrderGetAllResponse, StatusCodes.OK);
};

const getById = async (c: Context, id: string): Promise<Response> => {
	const order = await orderService.getById(id);
	return c.json(order satisfies OrderGetByIdResponse, StatusCodes.OK);
};

const create = async (
	c: Context,
	body: OrderCreateRequest,
): Promise<Response> => {
	const order = await orderService.create(body);
	return c.json(order satisfies OrderCreateResponse, StatusCodes.CREATED);
};

const updateStatus = async (
	c: Context,
	id: string,
	body: OrderUpdateStatusRequest,
): Promise<Response> => {
	const order = await orderService.updateStatus(id, body);
	return c.json(order satisfies OrderUpdateStatusResponse, StatusCodes.OK);
};

export const orderController = {
	getAll,
	getById,
	create,
	updateStatus,
};
