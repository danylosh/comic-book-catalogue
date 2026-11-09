import { createMiddleware } from "hono/factory";
import { StatusCodes } from "http-status-codes";

import { auth } from "../services";

export const authMiddleware = createMiddleware(async (c, next) => {
	const session = await auth.api.getSession({
		headers: c.req.raw.headers,
	});

	if (!session) {
		return c.json({ message: "Unauthorized" }, StatusCodes.UNAUTHORIZED);
	}

	await next();
});
