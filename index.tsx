import React from "react";
import ReactDOM from "react-dom/client";
import { sample } from "./fixtures/markdown";
import useMarkdown from "./src/use-markdown";

const App = () => {
  const { jsx } = useMarkdown(sample);
  return jsx;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
