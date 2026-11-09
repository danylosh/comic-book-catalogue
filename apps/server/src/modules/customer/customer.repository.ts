import type { Prisma } from "@comic-book-catalogue/db";
import type {
	CustomerFindManyInput,
	CustomerGetAllResult,
	CustomerRecord,
} from "@comic-book-catalogue/types/customer/repository";

import { db } from "../../db";
import { customerSelector } from "./utils/customer.utils.selector";

const getAll = async (
	input: CustomerFindManyInput = {},
): Promise<CustomerGetAllResult> => {
	const [customers, total] = await Promise.all([
		db.customer.findMany({
			...input,
			select: customerSelector.getAllSelector(),
		}),
		db.customer.count({ where: input.where }),
	]);

	return { customers, total };
};

const getById = async (
	where: Prisma.CustomerWhereUniqueInput,
): Promise<CustomerRecord | null> => {
	return db.customer.findUnique({
		where,
		select: customerSelector.getByIdSelector(),
	});
};

const create = async (
	data: Prisma.CustomerCreateInput,
): Promise<CustomerRecord> => {
	return db.customer.create({
		data,
		select: customerSelector.getByIdSelector(),
	});
};

const update = async (
	where: Prisma.CustomerWhereUniqueInput,
	data: Prisma.CustomerUpdateInput,
): Promise<CustomerRecord> => {
	return db.customer.update({
		where,
		data,
		select: customerSelector.getByIdSelector(),
	});
};

const remove = async (
	where: Prisma.CustomerWhereUniqueInput,
): Promise<{ id: string }> => {
	return db.customer.delete({
		where,
		select: { id: true },
	});
};

export const customerRepository = {
	getAll,
	getById,
	create,
	update,
	remove,
};
