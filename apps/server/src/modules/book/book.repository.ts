import type { Prisma } from "@comic-book-catalogue/db";
import type {
	BookFindManyInput,
	BookGetAllResult,
	BookPriceRecord,
	BookRecord,
} from "@comic-book-catalogue/types/book/repository";

import { db } from "../../db";
import { bookSelector } from "./utils/book.utils.selector";

const getAll = async (
	input: BookFindManyInput = {},
): Promise<BookGetAllResult> => {
	const [books, total] = await Promise.all([
		db.book.findMany({
			...input,
			select: bookSelector.getAllSelector(),
		}),
		db.book.count({ where: input.where }),
	]);

	return { books, total };
};

const getById = async (
	where: Prisma.BookWhereUniqueInput,
): Promise<BookRecord | null> => {
	return db.book.findUnique({
		where,
		select: bookSelector.getByIdSelector(),
	});
};

const getPricesByIds = async (ids: string[]): Promise<BookPriceRecord[]> => {
	return db.book.findMany({
		where: { id: { in: ids } },
		select: {
			id: true,
			price: true,
		},
	});
};

const create = async (data: Prisma.BookCreateInput): Promise<BookRecord> => {
	return db.book.create({
		data,
		select: bookSelector.getByIdSelector(),
	});
};

const update = async (
	where: Prisma.BookWhereUniqueInput,
	data: Prisma.BookUpdateInput,
): Promise<BookRecord> => {
	return db.book.update({
		where,
		data,
		select: bookSelector.getByIdSelector(),
	});
};

const remove = async (
	where: Prisma.BookWhereUniqueInput,
): Promise<{ id: string }> => {
	return db.book.delete({
		where,
		select: { id: true },
	});
};

export const bookRepository = {
	getAll,
	getById,
	getPricesByIds,
	create,
	update,
	remove,
};
