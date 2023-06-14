import { createRoot } from "react-dom/client";

export default () => {
	const App = () => {
		return <div>Hello Seaper Front!</div>;
	};
	
	const root = createRoot(document.getElementById("root")!);
	root.render(<App />);
}