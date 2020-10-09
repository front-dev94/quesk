import * as Yup from "yup";

const forgotPasswordSchema = Yup.object().shape({
  username: Yup.string()
      .email('Invalid email')
      .required(' ')
});

export default forgotPasswordSchema;