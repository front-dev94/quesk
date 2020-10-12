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
        ref={getForm}
        onSubmit={(values) => {}}
        validationSchema={askQuestionSchema}
        validateOnChange={false}
        enableReinitialize
        initialValues={{
          title: undefined,
          content: undefined
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
                id="description"
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