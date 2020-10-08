import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, 'Too Short!')
    .required('Required'),
  password: Yup.string()
      .min(8, 'Too Short!')
      .required('Required'),
  confirmPassword: Yup.string()
    .min(8, 'Too Short!')
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default changePasswordSchema;