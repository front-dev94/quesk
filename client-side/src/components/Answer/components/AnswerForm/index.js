import React from 'react';
import {Form, Formik} from "formik";
import { Button } from 'reactstrap';
import InputBox from './../../../Input/InputBox';
import answerSchema from "./answerSchema";

import './style.scss';

const AnswerForm = ({onSubmit}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={answerSchema}
      validateOnChange={false}
      enableReinitialize
      initialValues={{
        content: '',
        hasError: false
      }}
      render={props => {
        return (
          <Form className="answer-form">
            <InputBox
              id="content"
              name="content"
              label="Leave a answer"
              component="textarea"
              {...props}
            />
            <div className="submit-answer">
              <Button color="primary" type="submit">Submit</Button>
            </div>
          </Form>
        );
      }}
    />
  )
}

export default AnswerForm;