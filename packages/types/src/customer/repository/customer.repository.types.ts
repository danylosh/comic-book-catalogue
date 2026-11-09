import type { Prisma } from "@comic-book-catalogue/db";

export type CustomerRecord = Prisma.CustomerGetPayload<{
	select: {
		id: true;
		firstName: true;
		lastName: true;
		email: true;
		phoneNumber: true;
		membership: true;
		_count: {
			select: {
				orders: true;
			};
		};
		createdAt: true;
		updatedAt: true;
	};
}>;

export type CustomerFindManyInput = Pick<
	Prisma.CustomerFindManyArgs,
	"where" | "orderBy" | "skip" | "take"
>;

export type CustomerGetAllResult = {
	customers: CustomerRecord[];
	total: number;
};
