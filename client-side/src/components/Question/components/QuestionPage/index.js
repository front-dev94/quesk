import React, {useState, useEffect} from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import PanelCard from './../../../PanelCard';
import PageContent from './../../../PageContent';
import Answer from './../../../Answer';

// Utils
import { getUserInitials } from './../../../../utils/helpers/userInitials';
import moment from 'moment';

// Services
import QuestionService from './../../../../services/QuestionService';
import AnswerService from '../../../../services/AnswerService';

import './style.scss';

const QuestionPage = (props) => {
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { id } = props.match.params;
        if (id) {
            const response = await QuestionService.getQuestion(id);
            if (!response.error) {
                setQuestion({
                    ...response.data,
                    upVotes: response.data.upVotes.length,
                    downVotes: response.data.downVotes.length
                });

                let answers = response.data.answers.map((item) => {
                    return {
                        ...item,
                        upVotes: item.upVotes.length,
                        downVotes: item.downVotes.length
                    }
                });

                setAnswers(answers);
            }
        }
    }

    const handleQuestionVoteUp = async (e, questionId) => {
        e.preventDefault();
        const response = await QuestionService.voteQuestionUp(questionId);

        const currentQuestion = question;

        if(!response.error){
            setQuestion({
                ...currentQuestion,
                upVotes: currentQuestion.upVotes + 1,
            });
        }
    }

    const handleQuestionVoteDown = async (e, questionId) => {
        e.preventDefault();
        const response = await QuestionService.voteQuestionDown(questionId);

        const currentQuestion = question;

        if(!response.error){
            setQuestion({
                ...currentQuestion,
                downVotes: currentQuestion.downVotes + 1
            });
        }
    }

    const handleAnswerVoteUp = async (e, answerId) => {
        e.preventDefault();
        const response = await AnswerService.voteAnswerUp(question._id, answerId);

        if(!response.error){
            const answerIndex = answers.findIndex(item => item._id === answerId);
            
            let currentAnswers = answers;

            currentAnswers[answerIndex].upVotes = currentAnswers[answerIndex].upVotes + 1;

            setAnswers(currentAnswers);
            getData();
        }
    }

    const handleAnswerVoteDown = async (e, answerId) => {
        e.preventDefault();
        const response = await AnswerService.voteAnswerDown(question._id, answerId);

        if(!response.error){
            const answerIndex = answers.findIndex(item => item._id === answerId);
        
            let currentAnswers = answers;

            currentAnswers[answerIndex].downVotes = currentAnswers[answerIndex].downVotes + 1;

            setAnswers(currentAnswers);
            getData();
        }
    }

    const handleRemoveQuestion = async (e, questionId) => {
        e.preventDefault();
        const response = await QuestionService.removeQuestion(questionId);

        if(response.error.deleted){
            props.history.push('/');
        }
    }

    const handleRemoveAnswer = async (e, answerId) => {
        e.preventDefault();
        const response = await AnswerService.removeAnswer(question._id, answerId);

        if(response.error.deleted){
            getData();
        }
    }

    const renderQuestionHeader = () => {
        const fullName = question && question.author ? question.author.firstName + ' ' + question.author.lastName : "";

        return (
            <div className="question-header">
                <div className="question-info">
                    <div className="question-author-image"><span className="user-avatar">{ getUserInitials(fullName) }</span></div>
                    <div className="question-title"><h4>Author: {question.author ? question.author.username : ""}</h4><p>Asked: {moment(question.createdAt).startOf('hour').fromNow()}</p></div>
                </div>
                <div className="question-reactions">
                    <div className="question-reaction">
                        <span>{question.upVotes}</span>
                        <button className="thumbs-up" onClick={(e) => handleQuestionVoteUp(e, question._id)}>
                            <i className="fe fe-thumbs-up"></i>
                        </button>
                    </div>
                    <div className="question-reaction">
                        <span>{question.downVotes}</span>
                        <button className="thumbs-down" onClick={(e) => handleQuestionVoteDown(e, question._id)}>
                            <i className="fe fe-thumbs-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        question ? <PageContent title={question.title} className="question-page">
            <div className="question-description">
                <Row>
                    <PanelCard md={12} lg={12} sm={12} title={renderQuestionHeader()}>
                        <div className="question-content">
                            <p>{question.content}</p>
                        </div>
                        {user.username === (question.author && question.author.username) && <div className="actions">
                            <button className="action-btn" onClick={(e) => handleRemoveQuestion(e, question._id)}><i className="fe fe-trash"></i></button>
                        </div>}
                    </PanelCard>
                </Row>
            </div>

            <div className="row">
                <div className="col-md-7">
                    <div className="question-answers">
                        <h4>Answers: {answers.length}</h4>
                        {answers && answers.length > 0 && answers.map((item, idx) => {
                            let authorFullName = item.author.firstName + ' ' + item.author.lastName;
                            return (
                                <div className="question-answer" key={idx}>
                                    <div className="d-flex justify-space-between">
                                        <div className="answer-author">
                                            <span className="author-avatar">{getUserInitials(authorFullName)}</span>
                                            <div className="author-info">
                                                <h5 className="author-username">{item.author.username}</h5>
                                                <span>{moment(item.createdAt).startOf('hour').fromNow()}</span>
                                            </div>
                                        </div>
                                        <div className="question-reactions">
                                            <div className="question-reaction">
                                                <span>{item.upVotes}</span>
                                                <button className="thumbs-up" onClick={(e) => handleAnswerVoteUp(e, item._id)}>
                                                    <i className="fe fe-thumbs-up"></i>
                                                </button>
                                            </div>
                                            <div className="question-reaction">
                                                <button className="thumbs-down"  onClick={(e) => handleAnswerVoteDown(e, item._id)}>
                                                    <i className="fe fe-thumbs-down"></i>
                                                </button>
                                            </div>
                                            {user.username === item.author.username &&<div className="question-reaction">
                                                <button className="thumbs-down"  onClick={(e) => handleRemoveAnswer(e, item._id)}>
                                                    <i className="fe fe-trash"></i>
                                                </button>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="answer-content">
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {user ? <Answer question={question} getData={getData} /> : <div className="write-answer-message">
                        <p>To be able to write answers please <Link to="/login">login</Link> or <Link to="/sign-up">register</Link> ...</p>
                    </div>}
                </div>
                <div className="col-md-5">

                </div>
            </div>
        </PageContent> : <div />
    );
}

export default QuestionPage;