import * as Yup from "yup";

const askQuestionSchema = Yup.object().shape({
    title: Yup.string().required('This field is required'),
    content: Yup.string().required('This field is required')
});

export default askQuestionSchema;