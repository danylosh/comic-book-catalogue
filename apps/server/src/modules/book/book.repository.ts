import type { Prisma } from "@comic-book-catalogue/db";

// TODO: implement book data access.
export const bookRepository = {
	getAll: async (_where: Prisma.BookWhereInput) => {
		throw new Error("bookRepository.getAll is not implemented");
	},
	getById: async (_id: string) => {
		throw new Error("bookRepository.getById is not implemented");
	},
	create: async (_data: Prisma.BookCreateInput) => {
		throw new Error("bookRepository.create is not implemented");
	},
	update: async (_id: string, _data: Prisma.BookUpdateInput) => {
		throw new Error("bookRepository.update is not implemented");
	},
	remove: async (_id: string) => {
		throw new Error("bookRepository.remove is not implemented");
	},
};
