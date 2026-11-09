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

// TODO: implement book business logic.
const getAll = async (
	_input: BookGetAllRequest,
): Promise<BookGetAllResponse> => {
	throw new Error("bookService.getAll is not implemented");
};

const getById = async (_id: string): Promise<BookGetByIdResponse> => {
	throw new Error("bookService.getById is not implemented");
};

const create = async (
	_input: BookCreateRequest,
	_createdById?: string,
): Promise<BookCreateResponse> => {
	throw new Error("bookService.create is not implemented");
};

const update = async (
	_id: string,
	_input: BookUpdateRequest,
): Promise<BookUpdateResponse> => {
	throw new Error("bookService.update is not implemented");
};

const remove = async (_id: string): Promise<BookRemoveResponse> => {
	throw new Error("bookService.remove is not implemented");
};

export const bookService = {
	getAll,
	getById,
	create,
	update,
	remove,
};
