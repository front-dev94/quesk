import React from 'react';
import {Form, Formik} from "formik";

import InputBox from '../../../../../Input/InputBox';
import ApplyTag from './../../../../../Tags/components/ApplyTag';
import askQuestionSchema from "./askQuestionSchema";

import './style.scss';

const AskQuestionForm = ({forwardedRef, onApplyTag}) => {
  return (
    <Formik
      innerRef={forwardedRef}
      onSubmit={(values) => {}}
      validationSchema={askQuestionSchema}
      validateOnChange={false}
      enableReinitialize
      initialValues={{
        title: '',
        content: '',
        hasError: false
      }}
      render={props => {
        return (
          <Form className="ask-question-form">
            <InputBox
              id="title"
              name="title"
              label="Title"
              {...props}
            />
            <ApplyTag id="tag" name="tag" placeholder="Apply tag" onApplyTag={onApplyTag} />
            <InputBox
              id="content"
              name="content"
              label="Description"
              component="textarea"
              {...props}
            />
          </Form>
        );
      }}
    />
  )
}


export default AskQuestionForm;