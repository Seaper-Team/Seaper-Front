/**
 * Seaper 路由
 * @author Xiaoyi311
 */

import * as React from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider} from "react-router-dom";
import Root from "./router/Root";
import NotFound from "./router/NotFound";
import Init from "./router/Init";
import Login from "./router/Login";

export default () => {
	const router = createHashRouter([
		{ path: "/", element: <Root />},
		{ path: "/init", element: <Init />},
		{ path: "/login", element: <Login />},
		{ path: "*", element: <NotFound />}
	]);

	const root = createRoot(document.getElementById("root")!);
	root.render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}