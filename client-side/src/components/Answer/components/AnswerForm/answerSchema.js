import * as Yup from "yup";

const answerSchema = Yup.object().shape({
    content: Yup.string().required('This field is required')
});

export default answerSchema;