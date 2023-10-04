import { createRoot } from "react-dom/client";
import App from "./Components/App";
import './custom.scss';
import "bootstrap-icons/font/bootstrap-icons.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <App />
);
