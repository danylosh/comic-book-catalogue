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

// TODO: implement category business logic.
const getAll = async (
	_input: CategoryGetAllRequest,
): Promise<CategoryGetAllResponse> => {
	throw new Error("categoryService.getAll is not implemented");
};

const getById = async (_id: string): Promise<CategoryGetByIdResponse> => {
	throw new Error("categoryService.getById is not implemented");
};

const create = async (
	_input: CategoryCreateRequest,
): Promise<CategoryCreateResponse> => {
	throw new Error("categoryService.create is not implemented");
};

const update = async (
	_id: string,
	_input: CategoryUpdateRequest,
): Promise<CategoryUpdateResponse> => {
	throw new Error("categoryService.update is not implemented");
};

const remove = async (_id: string): Promise<CategoryRemoveResponse> => {
	throw new Error("categoryService.remove is not implemented");
};

export const categoryService = {
	getAll,
	getById,
	create,
	update,
	remove,
};
