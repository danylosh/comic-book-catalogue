import type { CustomerRecord } from "@comic-book-catalogue/types/customer/repository";
import type {
	CustomerGetAllResponse,
	CustomerGetByIdResponse,
	CustomerRemoveResponse,
} from "@comic-book-catalogue/types/customer/response";

const formatCustomer = (customer: CustomerRecord): CustomerGetByIdResponse => ({
	id: customer.id,
	firstName: customer.firstName,
	lastName: customer.lastName,
	email: customer.email,
	phoneNumber: customer.phoneNumber,
	membership: customer.membership,
	orderCount: customer._count.orders,
	createdAt: customer.createdAt.toISOString(),
	updatedAt: customer.updatedAt.toISOString(),
});

const getAllFormatter = (
	customers: CustomerRecord[],
	total: number,
	page: number,
	pageSize: number,
): CustomerGetAllResponse => ({
	items: customers.map(formatCustomer),
	total,
	page,
	pageSize,
});

const getByIdFormatter = (customer: CustomerRecord): CustomerGetByIdResponse =>
	formatCustomer(customer);

const createFormatter = (customer: CustomerRecord): CustomerGetByIdResponse =>
	formatCustomer(customer);

const updateFormatter = (customer: CustomerRecord): CustomerGetByIdResponse =>
	formatCustomer(customer);

const removeFormatter = (id: string): CustomerRemoveResponse => ({ id });

export const customerFormatter = {
	getAllFormatter,
	getByIdFormatter,
	createFormatter,
	updateFormatter,
	removeFormatter,
};
