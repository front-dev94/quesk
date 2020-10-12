import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Too Short!')
    .required(' '),
  firstName: Yup.string()
    .required(' '),
  lastName: Yup.string()
    .required(' '),
  email: Yup.string()
    .email('Invalid email'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .required('Required')
});

export default signUpSchema;