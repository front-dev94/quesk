import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email')
    .required(' '),
  confirmationCode: Yup.string()
    .min(5, 'Too Short!')
    .required(' '),
  password: Yup.string()
    .min(5, 'Too Short!')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required('Password confirm is required')
});

export default resetPasswordSchema;