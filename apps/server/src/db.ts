import { createPrismaClient } from "@comic-book-catalogue/db";

import { ENV } from "./env.server";

export const db = createPrismaClient(ENV);
