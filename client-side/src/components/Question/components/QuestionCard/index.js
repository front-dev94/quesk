import React, {Component} from 'react';
import { getUserInitials } from 'utils/helpers/userInitials';
import { getRandomColor } from 'utils/helpers/randomColor';
import history from 'store/history';
import moment from 'moment';

import './style.scss';

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
            <div>
                {question && <div className="question-item">
                    <div className="question-rating">
                        <div className="question-likes">
                            <span>{question.upVotes.length}</span>
                            likes
                        </div>
                        <div className="question-answers">
                            <span>{question.answers.length}</span>
                            answers
                        </div>
                    </div>
                    <div className="question-info">
                        <div className="question-header">
                            <div className="question-author-image" style={{backgroundColor: getRandomColor()}}>
                                <span className="user-avatar">{ getUserInitials(fullName) }</span>
                            </div>
                            <div className="question-title">
                                <a onClick={(e) => this.handleViewDetails(e, question)}>
                                    {question.title}
                                </a>
                                <p>Asked: {moment(question.createdAt).startOf('hour').fromNow() }</p>
                            </div>
                        </div>
                        <div className="question-content">
                            <p>{question.content}</p>
                        </div>
                        <div className="tags">
                            <div className="tag">reactjs</div>
                            <div className="tag">javascript</div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

export default QuestionCard;
