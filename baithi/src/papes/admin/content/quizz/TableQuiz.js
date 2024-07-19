import { useState } from "react";
import "./ManageQuiz.scss";
import ModelDeleteQuiz from './ModelDeleteQuiz';
import ModelUpdateQuiz from './ModelUpdateQuiz';
function TableQuiz({ listQuiz,fetchQuiz }) {
    const [isShowDeleteQuiz, setIsShowDeleteQuiz] = useState(false);
    const [dataDeleteQuiz, setDataDeleteQuiz] = useState([]);
    const [dataUpdateQuiz, setDataUpdateQuiz] = useState([]);
    const [isShowUpdateQuiz, setIsShowUpdateQuiz] = useState(false);
    const handleUpdateQuiz = (quizz) => {
        setIsShowUpdateQuiz(true);
        setDataUpdateQuiz(quizz);
    };
    const handleDeleteQuiz = (quizz) => {
        setIsShowDeleteQuiz(true);
        setDataDeleteQuiz(quizz);
    };
  return (
    <>
      <div className="table-quiz">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Level</th>
              <th scope="col"> Action</th>
            </tr>
          </thead>
          <tbody>
            {listQuiz &&
              listQuiz.length > 0 &&
              listQuiz.map((item, index) => (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="btn btn-warning "
                      onClick={() => handleUpdateQuiz(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ModelDeleteQuiz
        show={isShowDeleteQuiz}
        setShow={setIsShowDeleteQuiz}
        dataDelete={dataDeleteQuiz}
        fetchQuiz={fetchQuiz}
      />
      <ModelUpdateQuiz
        show={isShowUpdateQuiz}
        setShow={setIsShowUpdateQuiz}
        dataUpdate={dataUpdateQuiz}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
}

export default TableQuiz;
