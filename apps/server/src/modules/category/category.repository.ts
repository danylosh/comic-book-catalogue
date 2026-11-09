import type { Prisma } from "@comic-book-catalogue/db";
import type {
	CategoryFindManyInput,
	CategoryRecord,
} from "@comic-book-catalogue/types/category/repository";

import { db } from "../../db";
import { categorySelector } from "./utils/category.utils.selector";

const getAll = async (
	input: CategoryFindManyInput = {},
): Promise<CategoryRecord[]> => {
	return db.category.findMany({
		...input,
		select: categorySelector.getAllSelector(),
	});
};

const getById = async (
	where: Prisma.CategoryWhereUniqueInput,
): Promise<CategoryRecord | null> => {
	return db.category.findUnique({
		where,
		select: categorySelector.getByIdSelector(),
	});
};

const create = async (
	data: Prisma.CategoryCreateInput,
): Promise<CategoryRecord> => {
	return db.category.create({
		data,
		select: categorySelector.getByIdSelector(),
	});
};

const update = async (
	where: Prisma.CategoryWhereUniqueInput,
	data: Prisma.CategoryUpdateInput,
): Promise<CategoryRecord> => {
	return db.category.update({
		where,
		data,
		select: categorySelector.getByIdSelector(),
	});
};

const remove = async (
	where: Prisma.CategoryWhereUniqueInput,
): Promise<{ id: string }> => {
	return db.category.delete({
		where,
		select: { id: true },
	});
};

export const categoryRepository = {
	getAll,
	getById,
	create,
	update,
	remove,
};
