import React from "react";
import ReactDOM from "react-dom/client";
import * as pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker";
import App from "./App";
import "./index.css";
pdfjs.GlobalWorkerOptions.workerSrc = "path/to/pdf.worker.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
