import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./reset.css";
import "./index.css";
import Home from "./pages/Home";
import ImageDisplay, { imageLoader } from "./pages/ImageDisplay";
import Upload from "./pages/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ path: "upload", element: <Upload /> }]
  },
  {
    path: ":id",
    element: <ImageDisplay />,
    loader: imageLoader
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
