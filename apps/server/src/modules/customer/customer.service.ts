import type { Prisma } from "@comic-book-catalogue/db";
import type {
	CustomerCreateRequest,
	CustomerGetAllRequest,
	CustomerUpdateRequest,
} from "@comic-book-catalogue/types/customer/request";
import type {
	CustomerCreateResponse,
	CustomerGetAllResponse,
	CustomerGetByIdResponse,
	CustomerRemoveResponse,
	CustomerUpdateResponse,
} from "@comic-book-catalogue/types/customer/response";

import { customerRepository } from "./customer.repository";
import { customerFormatter } from "./utils/customer.utils.formatter";

const getAll = async (
	input: CustomerGetAllRequest,
): Promise<CustomerGetAllResponse> => {
	const where: Prisma.CustomerWhereInput = {};

	if (input.search) {
		where.OR = [
			{ firstName: { contains: input.search, mode: "insensitive" } },
			{ lastName: { contains: input.search, mode: "insensitive" } },
			{ email: { contains: input.search, mode: "insensitive" } },
		];
	}

	if (input.membership) {
		where.membership = input.membership;
	}

	const orderByMap: Record<
		CustomerGetAllRequest["sortBy"],
		Prisma.CustomerOrderByWithRelationInput
	> = {
		firstName: { firstName: input.sortOrder },
		lastName: { lastName: input.sortOrder },
		email: { email: input.sortOrder },
		createdAt: { createdAt: input.sortOrder },
	};

	const { customers, total } = await customerRepository.getAll({
		where,
		orderBy: orderByMap[input.sortBy],
		skip: (input.page - 1) * input.pageSize,
		take: input.pageSize,
	});

	return customerFormatter.getAllFormatter(
		customers,
		total,
		input.page,
		input.pageSize,
	);
};

const getById = async (id: string): Promise<CustomerGetByIdResponse> => {
	const customer = await customerRepository.getById({ id });

	if (!customer) {
		throw new Error("Customer not found");
	}

	return customerFormatter.getByIdFormatter(customer);
};

const create = async (
	input: CustomerCreateRequest,
): Promise<CustomerCreateResponse> => {
	const customer = await customerRepository.create({
		firstName: input.firstName,
		lastName: input.lastName,
		email: input.email,
		phoneNumber: input.phoneNumber,
		membership: input.membership,
	});

	return customerFormatter.createFormatter(customer);
};

const update = async (
	id: string,
	input: CustomerUpdateRequest,
): Promise<CustomerUpdateResponse> => {
	const data: Prisma.CustomerUpdateInput = {};

	if (input.firstName !== undefined) {
		data.firstName = input.firstName;
	}

	if (input.lastName !== undefined) {
		data.lastName = input.lastName;
	}

	if (input.email !== undefined) {
		data.email = input.email;
	}

	if (input.phoneNumber !== undefined) {
		data.phoneNumber = input.phoneNumber;
	}

	if (input.membership !== undefined) {
		data.membership = input.membership;
	}

	const customer = await customerRepository.update({ id }, data);

	return customerFormatter.updateFormatter(customer);
};

const remove = async (id: string): Promise<CustomerRemoveResponse> => {
	const removed = await customerRepository.remove({ id });

	return customerFormatter.removeFormatter(removed.id);
};

export const customerService = {
	getAll,
	getById,
	create,
	update,
	remove,
};
