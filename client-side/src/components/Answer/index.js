import React, {Component} from 'react';
import QuestionService from '../../services/QuestionService';
import AnswerForm from './components/AnswerForm';
import './style.scss';

class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit = async (values, {resetForm, validateForm, setFieldValue}) => {
        const {content} = values;
        const {question} = this.props;

        const data = {
            content: content
        };

        const answer = await QuestionService.answerOnQuestion(question._id, data);
        setFieldValue("hasError", false);

        if (!answer.error) {
            resetForm({ content: '', hasError: false});
            await this.props.getData();
        } else {
            setFieldValue("hasError", true);
            validateForm({});
        }
    };

    render() {
        return (
            <div className="answer-on-question-container">
                <AnswerForm onSubmit={this.handleOnSubmit}/>
            </div>
        );
    }
}

export default Answer;
