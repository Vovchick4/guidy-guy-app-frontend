import { useFormik } from "formik"
import * as Yup from "yup"
import { Loader } from "../../components";

const validationSchema = Yup.object().shape({
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
    repeatpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password must much")
        .required('Required')
});

export default function SignUp() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            role: "user",
            password: "",
            repeatPassword: ""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return (
        <div>
            <h1>Sign Up</h1>

            <form onSubmit={formik.handleSubmit}>
                <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
                <p>{formik.errors.name}</p>
                <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                <p>{formik.errors.email}</p>
                <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                <p>{formik.errors.password}</p>
                <input type="password" name="repeatPassword" onChange={formik.handleChange} value={formik.values.repeatPassword} />
                <p>{formik.errors.repeatPassword}</p>

                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}
