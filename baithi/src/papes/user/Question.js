// lodash
import './Detail.scss';
import { IoIosClose, IoIosCheckmark } from 'react-icons/io';
function Question({ data, index, handleCheckBox, isShowAnswer }) {
    if (!data && !data.length) {
        return <></>;
    }

    const handleCheckbox = (aId, qId) => {
        handleCheckBox(aId, qId);
    };

    return (
        <div className="question-child">
            {data.image ? (
                <div className="q-anh">
                    <img className="q-image" src={`data:image/jpeg;base64,${data.image}`} />
                </div>
            ) : (
                <div></div>
            )}

            <div className="question">
                {' '}
                Question {index + 1}: {data.questionDes} ??
            </div>
            <div className="answer">
                {data.answers &&
                    data.answers.length &&
                    data.answers.map((item, index) => {
                        return (
                            <div key={index} className="a=child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={() => handleCheckbox(item.id, data.questionId)}
                                        id="flexCheckDefault"
                                        checked={item.isSelected}
                                    />
                                    <label className="form-check-label">
                                        {item.description}
                                    </label>
                                    {isShowAnswer === true && (
                                        <>
                                            {item.isSelected === true && item.isCorrect === false && (
                                                <IoIosClose className="incorrect" />
                                            )}

                                            {item.isCorrect === true && <IoIosCheckmark className="correct" />}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Question;
