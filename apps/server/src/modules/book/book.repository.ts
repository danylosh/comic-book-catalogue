import type { Prisma } from "@comic-book-catalogue/db";
import type {
	BookFindManyInput,
	BookGetAllResult,
	BookPriceRecord,
	BookRecord,
} from "@comic-book-catalogue/types/book/repository";

import { db } from "../../db";
import { bookSelector } from "./utils/book.utils.selector";

export const bookRepository = {
	async getAll(input: BookFindManyInput = {}): Promise<BookGetAllResult> {
		const [books, total] = await Promise.all([
			db.book.findMany({
				...input,
				select: bookSelector.getAllSelector(),
			}),
			db.book.count({ where: input.where }),
		]);

		return { books, total };
	},

	getById(
		where: Prisma.BookWhereUniqueInput,
	): Promise<BookRecord | null> {
		return db.book.findUnique({
			where,
			select: bookSelector.getByIdSelector(),
		});
	},

	getPricesByIds(ids: string[]): Promise<BookPriceRecord[]> {
		return db.book.findMany({
			where: { id: { in: ids } },
			select: { id: true, price: true },
		});
	},

	create(data: Prisma.BookCreateInput): Promise<BookRecord> {
		return db.book.create({
			data,
			select: bookSelector.getByIdSelector(),
		});
	},

	update(
		where: Prisma.BookWhereUniqueInput,
		data: Prisma.BookUpdateInput,
	): Promise<BookRecord> {
		return db.book.update({
			where,
			data,
			select: bookSelector.getByIdSelector(),
		});
	},

	remove(where: Prisma.BookWhereUniqueInput): Promise<{ id: string }> {
		return db.book.delete({
			where,
			select: { id: true },
		});
	},
};
