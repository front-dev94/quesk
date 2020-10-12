import React, {Component} from 'react';
import { Row } from 'reactstrap';
import PanelCard from 'components/PanelCard';
import PageContent from 'components/PageContent';
import {QuestionService} from 'services';
import { getUserInitials } from 'utils/helpers/userInitials';
import {getRandomColor} from 'utils/helpers/randomColor';
import moment from 'moment';

import './style.scss';

class QuestionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            question: undefined
        }
    }
    
    async componentDidMount() {
        const { id } = this.props.match.params;
        if (id) {
            const question = await QuestionService.getQuestion(id);
            if (!question.error) {
                this.setState({
                    question
                });
            }
        }
    }

    handleVoteUp = async (e, questionId) => {
        e.preventDefault();
        const response = await QuestionService.voteUp(questionId);

        if(!response.error){
            const question = await QuestionService.getQuestion(questionId);
            if (!question.error) {
                this.setState({
                    question
                });
            }
        }
    }

    handleVoteDown = async (e, questionId) => {
        e.preventDefault();
        const response = await QuestionService.voteDown(questionId);

        if(!response.error){
            const question = await QuestionService.getQuestion(questionId);
            if (!question.error) {
                this.setState({
                    question
                });
            }
        }
    }

    renderQuestionHeader = () => {
        const {question} = this.state;
        const fullName = question && question.author ? question.author.firstName + ' ' + question.author.lastName : "";

        return (
            <div className="question-header">
                <div className="question-info">
                    <div className="question-author-image"><span className="user-avatar">{ getUserInitials(fullName) }</span></div>
                    <div className="question-title"><h4>Author: {fullName}</h4><p>Asked: {moment(question.createdAt).startOf('hour').fromNow() }</p></div>
                </div>
                <div className="question-reactions">
                    <div className="question-reaction">
                        <span>{question.upVotes.length}</span>
                        <button className="thumbs-up" onClick={(e) => this.handleVoteUp(e, question._id)}>
                            <i className="fe fe-thumbs-up"></i>
                        </button>
                    </div>
                    <div className="question-reaction">
                        <span>{question.downVotes.length}</span>
                        <button className="thumbs-down" onClick={(e) => this.handleVoteDown(e, question._id)}>
                            <i className="fe fe-thumbs-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const {question} = this.state;
        return (
            question ? <PageContent title={question.title} className="question-page">
                <Row>
                    <PanelCard md={10} lg={10} sm={12} title={this.renderQuestionHeader()}>
                        <div className="question-content">
                            <p>{question.content}</p>
                        </div> 
                    </PanelCard>
                </Row>
            </PageContent> : <div />
        );
    }
}

export default QuestionPage;
