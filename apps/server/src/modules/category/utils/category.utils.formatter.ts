import type { CategoryRecord } from "@comic-book-catalogue/types/category/repository";
import type {
	CategoryGetAllResponse,
	CategoryGetByIdResponse,
	CategoryRemoveResponse,
} from "@comic-book-catalogue/types/category/response";

const formatCategory = (category: CategoryRecord): CategoryGetByIdResponse => ({
	id: category.id,
	name: category.name,
	bookCount: category._count.books,
});

const getAllFormatter = (
	categories: CategoryRecord[],
): CategoryGetAllResponse => categories.map(formatCategory);

const getByIdFormatter = (category: CategoryRecord): CategoryGetByIdResponse =>
	formatCategory(category);

const createFormatter = (category: CategoryRecord): CategoryGetByIdResponse =>
	formatCategory(category);

const updateFormatter = (category: CategoryRecord): CategoryGetByIdResponse =>
	formatCategory(category);

const removeFormatter = (id: string): CategoryRemoveResponse => ({ id });

export const categoryFormatter = {
	getAllFormatter,
	getByIdFormatter,
	createFormatter,
	updateFormatter,
	removeFormatter,
};
