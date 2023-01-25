import "./ImageForm.css";
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FormEvent,
  SetStateAction,
  useState
} from "react";
import mountains from "../images/mountains.svg";
import { useNavigate } from "react-router-dom";

export default function ImageForm({
  error,
  setError
}: {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}) {
  const [image, setImage] = useState<Blob>();
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (!image) return setError("Please upload an image file.");
    formData.append("image", image);
    navigate("/upload");
    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData
      });
      const json: Image | { error: string } = await response.json();
      if ("error" in json) {
        navigate("/");
        setError(json.error);
      } else {
        navigate(`/${json._id}`);
      }
    } catch (e) {
      navigate("/");
      setError(e instanceof Error ? e.message : "Please try again.");
    }
  };
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return setError("Please upload a file.");
    await setImage(event.target.files[0]);
    document.forms[0].requestSubmit();
  };
  const handleClick = () => {
    const input: HTMLInputElement | null =
      document.querySelector("input[type='file']");
    if (input) input.click();
  };
  const dragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const drop = async (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    await setImage(event.dataTransfer.files[0]);
    document.forms[0].requestSubmit();
  };

  return (
    <>
      <div
        className="upload--drop"
        onClick={handleClick}
        onDragOver={dragOver}
        onDrop={drop}
      >
        <img
          src={mountains}
          alt="Mountain scene"
          className="upload--drop__img"
        />
        <p className="upload__p">Drag & Drop Image</p>
      </div>
      <form
        encType="multipart/form-data"
        className="upload--form"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleUpload}
          style={{ display: "none" }}
        />
        <p className="upload__p">Or</p>
        <button
          type="button"
          onClick={handleClick}
          className="upload--form__file"
        >
          Choose File
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </>
  );
}
