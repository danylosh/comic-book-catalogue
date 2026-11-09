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

// TODO: implement customer business logic.
const getAll = async (
	_input: CustomerGetAllRequest,
): Promise<CustomerGetAllResponse> => {
	throw new Error("customerService.getAll is not implemented");
};

const getById = async (_id: string): Promise<CustomerGetByIdResponse> => {
	throw new Error("customerService.getById is not implemented");
};

const create = async (
	_input: CustomerCreateRequest,
): Promise<CustomerCreateResponse> => {
	throw new Error("customerService.create is not implemented");
};

const update = async (
	_id: string,
	_input: CustomerUpdateRequest,
): Promise<CustomerUpdateResponse> => {
	throw new Error("customerService.update is not implemented");
};

const remove = async (_id: string): Promise<CustomerRemoveResponse> => {
	throw new Error("customerService.remove is not implemented");
};

export const customerService = {
	getAll,
	getById,
	create,
	update,
	remove,
};
