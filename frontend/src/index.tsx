/* @refresh reload */
import { render } from "solid-js/web";
import "./styles/tokens.module.css";
import "./styles/global.css";
import App from "./App.tsx";

const root = document.getElementById("root");

render(() => <App />, root!);
