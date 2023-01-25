import "./Home.css";
import ImageForm from "../components/ImageForm";
import Main from "../components/Main";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const location = useLocation();
  const [error, setError] = useState("");

  return location.pathname === "/upload" ? (
    <Outlet />
  ) : (
    <Main>
      <h1 className="main__title">Upload Image</h1>
      <h2 className="main__subtitle">Accepted Formats: JPEG & PNG</h2>
      <ImageForm error={error} setError={setError} />
    </Main>
  );
}
