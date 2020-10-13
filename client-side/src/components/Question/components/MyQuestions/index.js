import React, { Component } from 'react';
import {connect} from 'react-redux';
import PageContent from 'components/PageContent';
import QuestionCard from './../QuestionCard';

import {QuestionService} from 'services';

import './style.scss';

const PAGE_TITLE = "My questions";

class MyQuestions extends Component {
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
    const {user} = this.props;

    if(user){
      this.setState({
        user
      }, async () => {
        const {user} = this.state;
        const questions = await QuestionService.getAllUserQuestions(user.id);
    
        if(!questions.error){
          this.setState({
            questions: questions.data
          })
        }
      });
    }
  }

  async componentDidUpdate(prevProps){
    if(prevProps.user != this.props.user){
      await this.getData();
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(MyQuestions);

