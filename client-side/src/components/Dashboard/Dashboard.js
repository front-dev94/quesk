import React, { Component } from 'react';
import PageContent from 'components/PageContent';
import {QuestionCard} from '../Question';

import {QuestionService} from 'services';

import './style.scss';

const PAGE_TITLE = "Questions";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }
  }

  async componentDidMount(){
      await this.getData();
  }

  async getData() {
      const questions = await QuestionService.getAllQuestions();
      
      if(questions){
          this.setState({
            questions
          })
      }
  }

  renderQuestionCards = () => {
    const {questions} = this.state;

    if(questions.length > 0){
      return questions.map((item, idx) => {
        return <QuestionCard question={item} key={idx} />
      })
    }
  }
  
  render() {
    return (
      <PageContent title={PAGE_TITLE}>
        {this.renderQuestionCards()}
      </PageContent>
    );
  }
}

export default Dashboard;
