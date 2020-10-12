import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string()
      .email('Invalid email')
      .required(' '),
  password: Yup.string()
      .min(5, 'Too Short!')
      .required(' '),
});

export default loginSchema;