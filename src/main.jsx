import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/all.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <App />,
  // </StrictMode>,
  <Provider store={store}>
    <App />
  </Provider>,
);
