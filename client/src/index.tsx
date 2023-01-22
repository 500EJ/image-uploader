import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from "react-router-dom";
import "./reset.css";
import "./index.css";
import Home from "./pages/Home";
import ImageDisplay from "./pages/ImageDisplay";
import Upload from "./pages/Upload";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/:id",
    element: <ImageDisplay />,
    loader: async ({ params }) => {
      const response = await fetch(`/api/images/${params.id}`);
      if (!response.ok || response.status !== 200) return redirect("/");
      return response;
    }
  },
  { path: "/upload", element: <Upload /> },
  { path: "*", loader: () => redirect("/") }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
