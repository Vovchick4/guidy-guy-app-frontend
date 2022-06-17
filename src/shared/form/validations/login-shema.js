import * as Yup from "yup"

const loginSchema = Yup.object().shape({
    email: Yup.string().trim().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(6, "Too short")
        .max(50, "Too long")
        .required("Required"),
});

export default loginSchema