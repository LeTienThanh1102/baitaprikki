import { useEffect, useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { FiPlusCircle } from "react-icons/fi";
import {
  getAllDataQuizForAdmin,
  postCreateNewQuiz,
} from "../../../../service/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";

function AddNewQuiz() {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState("");
  const [preview, setPreview] = useState("");
  const [listQuiz, setListQuiz] = useState([]);

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const handleUploadImg = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllDataQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !des) {
      toast.error("Name/Description is required");
      return;
    }

    let res = await postCreateNewQuiz(des, name, level.value, image);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
      toast.success(res.EM);
      setName("");
      setDes("");
      setLevel("");
      setImage(null);
      setPreview("");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz:</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your quiz name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description...."
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="form-floating mb-3">
            <Select
              options={options}
              value={level}
              placeholder="Quiz Type....."
              onChange={setLevel}
            />
          </div>
          <div className="more-action">
            <label className="form-label lable-upload upload" htmlFor="upload">
              <FiPlusCircle />
              Upload File Image
            </label>
            <input
              type="file"
              id="upload"
              hidden
              onChange={handleUploadImg}
            />
          </div>
          <div className="col-md-12 img-review">
            {preview ? (
              <img src={preview} className="img-review-upload" alt="preview" />
            ) : (
              <div></div>
            )}
          </div>
          <div className="mt-3 button-save">
            <button
              className="btn btn-warning"
              onClick={handleSubmitQuiz}
            >
              Save
            </button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail">
        <div className="table-title mb-3"> List Quizzz.... </div>
        <TableQuiz
          listQuiz={listQuiz}
          setListQuiz={setListQuiz}
          fetchQuiz={fetchQuiz}
        />
      </div>
    </>
  );
}

export default AddNewQuiz;
