/**
 * Seaper 路由
 * @author Xiaoyi311
 */

import * as React from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider} from "react-router-dom";
import Root from "./router/Root";
import NotFound from "./router/NotFound";

export default () => {
	const router = createHashRouter([
		{ path: "/", element: <Root />},
		{ path: "*", element: <NotFound />}
	]);

	const root = createRoot(document.getElementById("root")!);
	root.render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}