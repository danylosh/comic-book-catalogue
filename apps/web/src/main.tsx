import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultPendingComponent: Loader,
	context: {},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(<RouterProvider router={router} />);
