import './Detail.scss';
import CountDown from './CountDown';
function RightContent({ dataquiz, handleFinish, setIndex }) {
    const onTimeUp = () => {
        handleFinish();
    };

    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            let isUnAnswer = question.answers.every((a) => a.isSelected === false);
            if (isUnAnswer === false) {
                return 'question-item selected';
            }
        }
        return 'question-item';
    };
    return (
        <div>
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp} />
            </div>
            <div className="name-question">
                {dataquiz &&
                    dataquiz.length > 0 &&
                    dataquiz.map((item, index) => (
                        <div key={index} className={getClassQuestion(item)} onClick={() => setIndex(index)}>
                            {index + 1}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default RightContent;
