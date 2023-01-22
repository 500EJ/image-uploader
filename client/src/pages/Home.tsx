import "./Home.css";
import ImageForm from "../components/ImageForm";
import Main from "../components/Main";

export default function Home() {
  return (
    <Main>
      <h1 className="main__title">Upload Image</h1>
      <h2 className="main__subtitle">Accepted Formats: JPEG & PNG</h2>
      <ImageForm />
    </Main>
  );
}
