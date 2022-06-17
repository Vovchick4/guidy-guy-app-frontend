import * as Yup from "yup"

const registrationSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .trim()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password must much")
        .required('Required')
});

export default registrationSchema