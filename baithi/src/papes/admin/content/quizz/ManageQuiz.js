import QuizQA from './QuizQA';
import AssignQA from './AssignQA';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddNewQuiz from './AddNewQuiz';

function ManageQuiz() {
    return (
        <div className="quiz-container">
            <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey="home" title="Quản Lí Bài Thi ">
                    <AddNewQuiz />
                </Tab>
                <Tab eventKey="profile" title="Cập Nhật Q/A Cho Bài Thi">
                    <QuizQA />
                </Tab>
                <Tab eventKey="longer-tab" title="Gán Quiz Cho Người Dùng">
                    <AssignQA />
                </Tab>
            </Tabs>
        </div>
    );
}

export default ManageQuiz;
