import React, {Component} from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PanelCard from 'components/PanelCard';
import PageContent from 'components/PageContent';
import Answer from 'components/Answer';
import {QuestionService} from 'services';
import { getUserInitials } from 'utils/helpers/userInitials';
import moment from 'moment';

import './style.scss';

class QuestionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            question: undefined
        }

        this.getData = this.getData.bind(this);
    }
    
    async componentDidMount() {
        await this.getData();
    }

    getData = async () => {
        const { id } = this.props.match.params;
        if (id) {
            const question = await QuestionService.getQuestion(id);
            if (!question.error) {
                this.setState({
                    question: {
                        ...question.data,
                        upVotes: question.data.upVotes.length,
                        downVotes: question.data.downVotes.length
                    },
                    answers: question.data.answers.map((item) => {
                        return {
                            ...item,
                            upVotes: item.upVotes.length,
                            downVotes: item.downVotes.length
                        }
                    })
                });
            }
        }
    }

    handleQuestionVoteUp = async (e, questionId) => {
        e.preventDefault();
        const response = await QuestionService.voteQuestionUp(questionId);

        const currentQuestion = this.state.question;

        if(!response.error){
            this.setState({
                question: {
                    ...currentQuestion,
                    upVotes: currentQuestion.upVotes + 1,
                }
            });
        }
    }

    handleQuestionVoteDown = async (e, questionId) => {
        e.preventDefault();
        const response = await QuestionService.voteQuestionDown(questionId);

        const currentQuestion = this.state.question;

        if(!response.error){
            this.setState({
                question: {
                    ...currentQuestion,
                    downVotes: currentQuestion.downVotes + 1
                }
            });
        }
    }

    handleAnswerVoteUp = async (e, answerId) => {
        e.preventDefault();
        const {question, answers} = this.state;
        const response = await QuestionService.voteAnswerUp(question._id, answerId);

        if(!response.error){
            const answerIndex = answers.findIndex(item => item._id === answerId);
        
            let currentAnswers = answers;

            currentAnswers[answerIndex].upVotes = currentAnswers[answerIndex].upVotes + 1;

            this.setState({
                answers: currentAnswers
            })
        }
    }

    handleAnswerVoteDown = async (e, answerId) => {
        e.preventDefault();
        const {question, answers} = this.state;
        const response = await QuestionService.voteAnswerDown(question._id, answerId);

        if(!response.error){
            const answerIndex = answers.findIndex(item => item._id === answerId);
        
            let currentAnswers = answers;

            currentAnswers[answerIndex].downVotes = currentAnswers[answerIndex].downVotes + 1;

            this.setState({
                answers: currentAnswers
            })
        }
    }

    renderQuestionHeader = () => {
        const {question} = this.state;
        const fullName = question && question.author ? question.author.firstName + ' ' + question.author.lastName : "";

        return (
            <div className="question-header">
                <div className="question-info">
                    <div className="question-author-image"><span className="user-avatar">{ getUserInitials(fullName) }</span></div>
                    <div className="question-title"><h4>Author: {fullName}</h4><p>Asked: {moment(question.createdAt).startOf('hour').fromNow()}</p></div>
                </div>
                <div className="question-reactions">
                    <div className="question-reaction">
                        <span>{question.upVotes}</span>
                        <button className="thumbs-up" onClick={(e) => this.handleQuestionVoteUp(e, question._id)}>
                            <i className="fe fe-thumbs-up"></i>
                        </button>
                    </div>
                    <div className="question-reaction">
                        <span>{question.downVotes}</span>
                        <button className="thumbs-down" onClick={(e) => this.handleQuestionVoteDown(e, question._id)}>
                            <i className="fe fe-thumbs-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {question, answers} = this.state;
        const {user} = this.props;

        return (
            question ? <PageContent title={question.title} className="question-page">
                    <div className="question-description">
                        <Row>
                            <PanelCard md={12} lg={12} sm={12} title={this.renderQuestionHeader()}>
                                <div className="question-content">
                                    <p>{question.content}</p>
                                </div> 
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
                                                        <button className="thumbs-up" onClick={(e) => this.handleAnswerVoteUp(e, item._id)}>
                                                            <i className="fe fe-thumbs-up"></i>
                                                        </button>
                                                    </div>
                                                    <div className="question-reaction">
                                                        <span>{item.downVotes}</span>
                                                        <button className="thumbs-down"  onClick={(e) => this.handleAnswerVoteDown(e, item._id)}>
                                                            <i className="fe fe-thumbs-down"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="answer-content">
                                                <p>{item.content}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            {user ? <Answer question={question} getData={this.getData} /> : <div className="write-answer-message">
                                <p>To be able to write answers please <Link to="/login">login</Link> or <Link to="/sign-up">register</Link> ...</p>
                            </div>}
                        </div>
                        <div className="col-md-5">

                        </div>
                    </div>
            </PageContent> : <div />
        );
    }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(QuestionPage);
