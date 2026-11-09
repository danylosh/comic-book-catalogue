import type { BookRecord } from "@comic-book-catalogue/types/book/repository";
import type {
	BookGetAllResponse,
	BookGetByIdResponse,
	BookRemoveResponse,
} from "@comic-book-catalogue/types/book/response";

const formatBook = (book: BookRecord): BookGetByIdResponse => ({
	...book,
	price: Number(book.price),
	createdAt: book.createdAt.toISOString(),
	updatedAt: book.updatedAt.toISOString(),
});

const getAllFormatter = (
	books: BookRecord[],
	total: number,
	page: number,
	pageSize: number,
): BookGetAllResponse => ({
	items: books.map(formatBook),
	total,
	page,
	pageSize,
});

const getByIdFormatter = (book: BookRecord): BookGetByIdResponse =>
	formatBook(book);

const createFormatter = (book: BookRecord): BookGetByIdResponse =>
	formatBook(book);

const updateFormatter = (book: BookRecord): BookGetByIdResponse =>
	formatBook(book);

const removeFormatter = (id: string): BookRemoveResponse => ({ id });

export const bookFormatter = {
	getAllFormatter,
	getByIdFormatter,
	createFormatter,
	updateFormatter,
	removeFormatter,
};
