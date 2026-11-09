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

// TODO: implement order business logic. The total price must be calculated
// from the requested books and stored on the order.
const getAll = async (
	_input: OrderGetAllRequest,
): Promise<OrderGetAllResponse> => {
	throw new Error("orderService.getAll is not implemented");
};

const getById = async (_id: string): Promise<OrderGetByIdResponse> => {
	throw new Error("orderService.getById is not implemented");
};

const create = async (
	_input: OrderCreateRequest,
	_createdById?: string,
): Promise<OrderCreateResponse> => {
	throw new Error("orderService.create is not implemented");
};

const updateStatus = async (
	_id: string,
	_input: OrderUpdateStatusRequest,
): Promise<OrderUpdateStatusResponse> => {
	throw new Error("orderService.updateStatus is not implemented");
};

export const orderService = {
	getAll,
	getById,
	create,
	updateStatus,
};
