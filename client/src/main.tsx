import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./reset.css";
import "./index.css";
import Home from "./pages/Home";
import ImageDisplay from "./pages/ImageDisplay";
import Upload from "./pages/Upload";
import { type Params, redirect } from "react-router-dom";

async function imageLoader({ params }: { params: Params<string> }) {
  try {
    const response = await fetch(`/api/images/${params.id}`);
    if (!response.ok) return redirect("/");
    return response;
  } catch {
    redirect("/");
  }
}

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
