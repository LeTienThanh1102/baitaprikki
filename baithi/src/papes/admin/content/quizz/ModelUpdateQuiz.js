import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateQuizz } from "../../../../service/apiService";
import { toast } from "react-toastify";
import { FiPlusCircle } from "react-icons/fi";


function ModelUpdateQuiz({ show, setShow, dataUpdate, fetchQuiz }) {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState("");
  const [review, setReview] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    // dataUpdate là array, có (!dataUpdate || !dataUpdate.lenght) === !isEmpty, tránh dùng lodash
    if (!dataUpdate || !dataUpdate.length) {
      setDes(dataUpdate.description);
      setLevel(dataUpdate.difficulty);
      setName(dataUpdate.name);
      setImage(null);
      if (dataUpdate.image) {
        setReview(`data:image/jpeg;base64,${dataUpdate.image}`);
      } else {
        setReview("");
      }
    }
  }, [dataUpdate]);

  const handleUploadImg = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setReview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitedQuiz = async () => {
    let data = await putUpdateQuizz(dataUpdate.id, des, name, level, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await fetchQuiz();
      handleClose();
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Level</label>
              <select
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="" disabled>
                  Level Quiz
                </option>
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="more-action">
              <label className="form-label lable-upload upload" htmlFor="upload-update">
                <FiPlusCircle />
                Upload File Image
              </label>
              <input
                type="file"
                id="upload-update"
                hidden
                onChange={handleUploadImg}
              />
            </div>
            <div className="col-md-12 img-review">
              {review ? (
                <img src={review} className="img-review-upload" alt="preview" />
              ) : (
                <div></div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitedQuiz}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelUpdateQuiz;
