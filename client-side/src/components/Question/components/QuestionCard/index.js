import React, {Component, Fragment} from 'react';
import { getUserInitials } from 'utils/helpers/userInitials';
import { getRandomColor } from 'utils/helpers/randomColor';
import history from 'store/history';
import moment from 'moment';

import './style.scss';
import { Col } from 'reactstrap';

class QuestionCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            question: undefined
        }
    }
    
    componentDidMount(){
        const {question} = this.props;

        if(question){
            this.setState({
                question
            })
        }
    }

    handleViewDetails = (e, question) => {
        e.preventDefault();
    
        history.push({
          pathname: `/questions/${question._id}`,
        });
      }

    render() {
        const {question} = this.state;
        const fullName = question && question.author ? question.author.firstName + ' ' + question.author.lastName : "";
        return (
            <Fragment>
                {question && <Col sm={12} md={6} lg={6}>
                    <div className="question-item">
                        {/* <div className="question-badge">
                            <i className="fe fe-award"></i>
                        </div> */}
                        <div className="question-info">
                            <div className="question-header">
                                <div className="question-title">
                                    <a onClick={(e) => this.handleViewDetails(e, question)}>
                                        {question.title}
                                    </a>
                                    <p>Asked: {moment(question.createdAt).startOf('hour').fromNow() }</p>
                                </div>
                            </div>
                            <div className="question-content">
                                <p>{question.content}</p>
                                <div className="tags">
                                    <div className="tag">reactjs</div>
                                    <div className="tag">javascript</div>
                                </div>
                            </div>
                        </div>
                        <div className="question-rating">
                            <div className="question-likes likes">
                                <span><i className="fe fe-thumbs-up"></i>{question.upVotes.length}</span>
                            </div>
                            <div className="question-likes dislikes">
                                <span><i className="fe fe-thumbs-down"></i>{question.downVotes.length}</span>
                            </div>
                            <div className="question-answers">
                                <span><i className="fe fe-message-square"></i>{question.answers.length}</span>
                            </div>
                        </div>
                    </div>
                </Col>}
            </Fragment>
        );
    }
}

export default QuestionCard;
