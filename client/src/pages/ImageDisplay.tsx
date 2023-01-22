import { useLoaderData } from "react-router-dom";
import "./ImageDisplay.css";
import checkmark from "../images/checkmark.svg";
import Main from "../components/Main";

export default function ImageDisplay() {
  const image: Image = useLoaderData() as Image;
  const handleClick = () => {
    void navigator.clipboard.writeText(window.location.href);
  };
  return (
    <Main>
      <img src={checkmark} alt="Checkmark" className="img__check" />
      <h1>Uploaded Successfully</h1>
      <img src={image.url} alt="Uploaded by user" className="img__img" />
      <p className="link">
        <span className="link__text">{window.location.href}</span>{" "}
        <button className="link__button" onClick={handleClick}>
          Copy Link
        </button>
      </p>
    </Main>
  );
}
