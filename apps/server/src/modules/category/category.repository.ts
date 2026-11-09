import type { Prisma } from "@comic-book-catalogue/db";

// TODO: implement category data access.
export const categoryRepository = {
	getAll: async (_where: Prisma.CategoryWhereInput) => {
		throw new Error("categoryRepository.getAll is not implemented");
	},
	getById: async (_id: string) => {
		throw new Error("categoryRepository.getById is not implemented");
	},
	create: async (_data: Prisma.CategoryCreateInput) => {
		throw new Error("categoryRepository.create is not implemented");
	},
	update: async (_id: string, _data: Prisma.CategoryUpdateInput) => {
		throw new Error("categoryRepository.update is not implemented");
	},
	remove: async (_id: string) => {
		throw new Error("categoryRepository.remove is not implemented");
	},
};
