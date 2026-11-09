import { Hono } from "hono";

import { bookRoutes } from "../modules/book/book.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { customerRoutes } from "../modules/customer/customer.routes";
import { orderRoutes } from "../modules/order/order.routes";
import { statisticsRoutes } from "../modules/statistics/statistics.routes";

export const apiRoutes = new Hono();

apiRoutes.route("/books", bookRoutes);
apiRoutes.route("/categories", categoryRoutes);
apiRoutes.route("/customers", customerRoutes);
apiRoutes.route("/orders", orderRoutes);
apiRoutes.route("/statistics", statisticsRoutes);
