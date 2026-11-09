import { createAuth } from "@comic-book-catalogue/auth";

import { db } from "./db";
import { ENV } from "./env.server";

export { db };

export const auth = createAuth(ENV, db);
