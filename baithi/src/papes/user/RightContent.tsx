import './Detail.scss';
import CountDown from './CountDown';
interface RightContentProps {
    dataquiz: {
        questionId: number;
        questionDes: string;
        image: string | null;
        answers: {
            id: number;
            description: string;
            isSelected: boolean;
            isCorrect: boolean;
        }[];
    }[];
    handleFinish: () => void;
    setIndex: (index: number) => void;
}
function RightContent(props:RightContentProps) {
    const { dataquiz, handleFinish, setIndex }=props;
    const getClassQuestion = (question:RightContentProps['dataquiz'][0]) => {
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
                <CountDown handleFinish={handleFinish} />
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
