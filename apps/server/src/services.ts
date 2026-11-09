import { createAuth } from "@comic-book-catalogue/auth";
import { createPrismaClient } from "@comic-book-catalogue/db";

import { ENV } from "./env.server";

export const db = createPrismaClient(ENV);
export const auth = createAuth(ENV, db);
