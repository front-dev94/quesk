import React, {useState, Fragment} from 'react';
import { Col } from 'reactstrap';

import history from '../../../../store/history';
import moment from 'moment';

import './style.scss';

const QuestionCard = ({question}) => {

    const handleViewDetails = (e, question) => {
        e.preventDefault();

        history.push({
            pathname: `/questions/${question._id}`,
        });
    }

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
                                <a onClick={(e) => handleViewDetails(e, question)}>
                                    {question.title}
                                </a>
                                <p>Asked: {moment(question.createdAt).startOf('hour').fromNow() }</p>
                            </div>
                        </div>
                        <div className="question-content">
                            <p>{question.content}</p>
                            <div className="tags">
                                <p>Tags:</p>
                                {question.tags.map((item, idx) => {
                                    return (
                                        <div className="tag" key={idx}>{item}</div>
                                    )
                                })}
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

export default QuestionCard;
