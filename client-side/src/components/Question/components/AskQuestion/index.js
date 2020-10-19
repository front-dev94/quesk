import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import AskQuestionForm from './components/AskQuestionForm';
import QuestionService from './../../../../services/QuestionService';

import './style.scss';
import ConfirmModal from './../../../ConfirmModal/index';

const AskQuestion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const form = useRef(null);
  const confirmModal = useRef();

  const toggleModal = () => setIsOpen(!isOpen);
  
  const isFormValid = async (form, values) => {
    const errors = await form.validateForm(values);
    return Object.keys(errors).length === 0;
  };

  const save = async () => {
    form.current.handleSubmit();
    const {values} = form.current;

    const isValid = await isFormValid(form.current, values)
    if (isValid) {
      const question = {
        title: values.title,
        content: values.content,
        tags
      };

      const response = await QuestionService.createQuestion(question);

      if(!response.error){
        form.current.resetForm();
        close();
      }
    }
  };

  const close = () => {
    setIsOpen(false);
    setTags([]);
  };

  const handleApplyTag = (tags) => {
    setTags(tags);
  }

  return (
    <div>
      <Button className="ask-question-btn" onClick={() => toggleModal()}>Ask question</Button>
      <ConfirmModal forwardedRef={confirmModal} />
      <Modal contentClassName="ask-question-modal" isOpen={isOpen} centered>
        <ModalHeader toggle={close}>
          Ask question
        </ModalHeader>
        <ModalBody>
          <AskQuestionForm forwardedRef={form} onApplyTag={handleApplyTag} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" outline onClick={() => save()}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AskQuestion;