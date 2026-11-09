import type {
	CategoryCreateRequest,
	CategoryGetAllRequest,
	CategoryUpdateRequest,
} from "@comic-book-catalogue/types/category/request";
import type {
	CategoryCreateResponse,
	CategoryGetAllResponse,
	CategoryGetByIdResponse,
	CategoryRemoveResponse,
	CategoryUpdateResponse,
} from "@comic-book-catalogue/types/category/response";

import { categoryRepository } from "./category.repository";
import { categoryFormatter } from "./utils/category.utils.formatter";

const getAll = async (
	input: CategoryGetAllRequest,
): Promise<CategoryGetAllResponse> => {
	const categories = await categoryRepository.getAll({
		where: input.search
			? {
					name: {
						contains: input.search,
						mode: "insensitive",
					},
				}
			: undefined,
		orderBy: { name: "asc" },
	});

	return categoryFormatter.getAllFormatter(categories);
};

const getById = async (id: string): Promise<CategoryGetByIdResponse> => {
	const category = await categoryRepository.getById({ id });

	if (!category) {
		throw new Error("Category not found");
	}

	return categoryFormatter.getByIdFormatter(category);
};

const create = async (
	input: CategoryCreateRequest,
): Promise<CategoryCreateResponse> => {
	const category = await categoryRepository.create({
		name: input.name,
	});

	return categoryFormatter.createFormatter(category);
};

const update = async (
	id: string,
	input: CategoryUpdateRequest,
): Promise<CategoryUpdateResponse> => {
	const category = await categoryRepository.update(
		{ id },
		{
			name: input.name,
		},
	);

	return categoryFormatter.updateFormatter(category);
};

const remove = async (id: string): Promise<CategoryRemoveResponse> => {
	const removed = await categoryRepository.remove({ id });

	return categoryFormatter.removeFormatter(removed.id);
};

export const categoryService = {
	getAll,
	getById,
	create,
	update,
	remove,
};
