import "./Upload.css";
import Main from "../components/Main";

export default function Upload() {
  return (
    <Main>
      <h1 className="uploading__title">Uploading...</h1>
      <div className="progress">
        <div className="progress__color"></div>
      </div>
    </Main>
  );
}
