import { Prisma } from "@comic-book-catalogue/db";
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

import { bookRepository } from "./book.repository";
import { bookFormatter } from "./utils/book.utils.formatter";

const getAll = async (
	input: BookGetAllRequest,
): Promise<BookGetAllResponse> => {
	const where: Prisma.BookWhereInput = {};

	if (input.search) {
		where.OR = [
			{ title: { contains: input.search, mode: "insensitive" } },
			{ author: { contains: input.search, mode: "insensitive" } },
			{ publisher: { contains: input.search, mode: "insensitive" } },
		];
	}

	if (input.categoryId) {
		where.categoryId = input.categoryId;
	}

	if (input.condition) {
		where.condition = input.condition;
	}

	if (input.minPrice !== undefined || input.maxPrice !== undefined) {
		where.price = {
			...(input.minPrice !== undefined ? { gte: input.minPrice } : {}),
			...(input.maxPrice !== undefined ? { lte: input.maxPrice } : {}),
		};
	}

	const orderByMap: Record<
		BookGetAllRequest["sortBy"],
		Prisma.BookOrderByWithRelationInput
	> = {
		title: { title: input.sortOrder },
		publicationYear: { publicationYear: input.sortOrder },
		price: { price: input.sortOrder },
		createdAt: { createdAt: input.sortOrder },
	};

	const { books, total } = await bookRepository.getAll({
		where,
		orderBy: orderByMap[input.sortBy],
		skip: (input.page - 1) * input.pageSize,
		take: input.pageSize,
	});

	return bookFormatter.getAllFormatter(
		books,
		total,
		input.page,
		input.pageSize,
	);
};

const getById = async (id: string): Promise<BookGetByIdResponse> => {
	const book = await bookRepository.getById({ id });

	if (!book) {
		throw new Error("Book not found");
	}

	return bookFormatter.getByIdFormatter(book);
};

const create = async (
	input: BookCreateRequest,
): Promise<BookCreateResponse> => {
	const book = await bookRepository.create({
		title: input.title,
		author: input.author,
		publisher: input.publisher,
		publicationYear: input.publicationYear,
		condition: input.condition,
		price: new Prisma.Decimal(input.price),
		stock: input.stock,
		category: { connect: { id: input.categoryId } },
	});

	return bookFormatter.createFormatter(book);
};

const update = async (
	id: string,
	input: BookUpdateRequest,
): Promise<BookUpdateResponse> => {
	const data: Prisma.BookUpdateInput = {};

	if (input.title !== undefined) {
		data.title = input.title;
	}

	if (input.author !== undefined) {
		data.author = input.author;
	}

	if (input.publisher !== undefined) {
		data.publisher = input.publisher;
	}

	if (input.publicationYear !== undefined) {
		data.publicationYear = input.publicationYear;
	}

	if (input.condition !== undefined) {
		data.condition = input.condition;
	}

	if (input.price !== undefined) {
		data.price = new Prisma.Decimal(input.price);
	}

	if (input.stock !== undefined) {
		data.stock = input.stock;
	}

	if (input.categoryId !== undefined) {
		data.category = { connect: { id: input.categoryId } };
	}

	const book = await bookRepository.update({ id }, data);

	return bookFormatter.updateFormatter(book);
};

const remove = async (id: string): Promise<BookRemoveResponse> => {
	const removed = await bookRepository.remove({ id });

	return bookFormatter.removeFormatter(removed.id);
};

export const bookService = {
	getAll,
	getById,
	create,
	update,
	remove,
};
