import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode data-oid="dmqt:9f">
    <Provider store={store} data-oid="w.40383">
      <App data-oid="hiq8dtb" />
    </Provider>
  </React.StrictMode>,
);
