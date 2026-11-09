import type { Prisma } from "@comic-book-catalogue/db";

// TODO: implement customer data access.
export const customerRepository = {
	getAll: async (_where: Prisma.CustomerWhereInput) => {
		throw new Error("customerRepository.getAll is not implemented");
	},
	getById: async (_id: string) => {
		throw new Error("customerRepository.getById is not implemented");
	},
	create: async (_data: Prisma.CustomerCreateInput) => {
		throw new Error("customerRepository.create is not implemented");
	},
	update: async (_id: string, _data: Prisma.CustomerUpdateInput) => {
		throw new Error("customerRepository.update is not implemented");
	},
	remove: async (_id: string) => {
		throw new Error("customerRepository.remove is not implemented");
	},
};
