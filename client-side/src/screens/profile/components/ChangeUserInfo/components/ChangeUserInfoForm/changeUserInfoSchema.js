import * as Yup from "yup";

const changeUserInfoSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, 'Too Short!'),
  password: Yup.string()
      .min(8, 'Too Short!'),
  confirmPassword: Yup.string()
    .min(8, 'Too Short!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default changeUserInfoSchema;