import { Formik, useFormik } from "formik"
import * as Yup from "yup"
import { useLoginMutation } from "../../redux/services/auth"

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too short')
        .max(50, 'Too long')
        .required('Required')
})

export default function LogIn() {
    const [login, result] = useLoginMutation()

    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            login(values)
            console.log(result?.status);
        }
    })
    return (
        <div>
            <h1>LogIn</h1>
            <form onSubmit={Formik.handleSubmit}>
                <input type="email" name="email" onChange={Formik.handleChange} value={Formik.values.email} />
                <p>{Formik.errors.email}</p>
                <input type="password" name="password" onChange={Formik.handleChange} value={Formik.values.password} />
                <p>{Formik.errors.password}</p>

                <button type="submit">Log In</button>
            </form>
        </div>
    )
}
