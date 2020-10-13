import React, {Component} from 'react';
import {Button, Input} from "reactstrap";
import {Form, Formik} from "formik";
import InputBox from "components/InputBox";
import Textarea from "components/Textarea";

import askQuestionSchema from "./askQuestionSchema";

import './style.scss';

class AskQuestionForm extends Component {
  render() {
    const {getForm} = this.props;
    return (
      <Formik
        innerRef={getForm}
        onSubmit={(values) => {}}
        validationSchema={askQuestionSchema}
        validateOnChange={false}
        enableReinitialize
        initialValues={{
          title: '',
          content: ''
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
              <Textarea
                id="content"
                name="description"
                label="Description"
                {...props}
              />
            </Form>
          );
        }}
      />
    )
  }
}


export default AskQuestionForm;