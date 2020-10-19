import React, {useState} from 'react';
import QuestionService from '../../services/QuestionService';
import AnswerForm from './components/AnswerForm';
import './style.scss';

const Answer = (props) => {
    const handleOnSubmit = async (values, {resetForm, validateForm, setFieldValue}) => {
        const {content} = values;
        const {question} = props;

        const answer = await QuestionService.answerOnQuestion(question._id, { content });
        setFieldValue("hasError", false);

        if (!answer.error) {
            resetForm();
            await props.getData();
        } else {
            setFieldValue("hasError", true);
            validateForm({});
        }
    };

    return (
        <div className="answer-on-question-container">
            <AnswerForm onSubmit={handleOnSubmit} />
        </div>
    );
}

export default Answer;
