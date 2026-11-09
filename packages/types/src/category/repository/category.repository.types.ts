import type { Prisma } from "@comic-book-catalogue/db";

export type CategoryRecord = Prisma.CategoryGetPayload<{
	select: {
		id: true;
		name: true;
		_count: {
			select: {
				books: true;
			};
		};
	};
}>;

export type CategoryFindManyInput = Pick<
	Prisma.CategoryFindManyArgs,
	"where" | "orderBy" | "skip" | "take"
>;
