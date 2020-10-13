import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {QuestionService} from 'services';
import AskQuestionForm from './components/AskQuestionForm';

import './style.scss';

class AskQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.form = React.createRef();
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  getForm = (form) => (this.form = form);

  isFormValid = async (values) => {
    const errors = await this.form.runValidationSchema(values);
    return Object.keys(errors).length === 0;
  };

  save = async () => {
    this.form.handleSubmit();
    const {values} = this.form;
    if (this.form.isValid) {

      const question = {
        title: values.title,
        content: values.content
      };

      const response = await QuestionService.createQuestion(question);

      if(!response.error){
        this.form.resetForm();
      }
    }
  };

  close = () => this.setState({isOpen: false});


  render() {
    const {isOpen} = this.state;
    return (
      <div>
        <Button className="ask-question-btn" onClick={() => this.toggleModal()}>Ask question</Button>
        <Modal contentClassName="ask-question-modal" isOpen={isOpen} centered>
          <ModalHeader toggle={this.close}>
            Ask question
          </ModalHeader>
          <ModalBody>
            <AskQuestionForm getForm={this.getForm} onSubmit={this.handleSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" outline onClick={this.save}>Save</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AskQuestion;