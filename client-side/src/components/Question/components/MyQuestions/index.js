import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Row } from 'reactstrap';
import PageContent from './../../../PageContent';
import QuestionCard from './../QuestionCard';

import QuestionService from './../../../../services/QuestionService';
import { queryString } from './../../../../utils/helpers/queryString';

const PAGE_TITLE = "My questions";

const MyQuestions = () => {
  const user = useSelector(state => state.user);

  const [questions, setQuestions] = useState({
    page: 1,
    size: 10,
    count: 0,
    payload: []
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async (page = questions.page, size = questions.size) => {
    if(user){
      const questions = await QuestionService.getAllUserQuestions(user.id, queryString({page, size}));

      if(!questions.error && questions.data){
        setQuestions(questions.data)
      }
    }
  }

  const renderQuestionCards = () => {
    if(questions.payload && questions.payload.length > 0){
      return (
        <Row>
          {questions.payload.map((item, idx) => {
              return <QuestionCard question={item} key={idx} />
            })}
        </Row>
      )
    }
  }

  return (
    <PageContent title={PAGE_TITLE}>
      {renderQuestionCards()}
    </PageContent>
  )
}

export default MyQuestions;