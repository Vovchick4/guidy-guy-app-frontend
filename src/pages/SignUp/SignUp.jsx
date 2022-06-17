import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useEffect } from "react";

import { Loader } from "../../components";
import { useRegisterMutation } from "../../redux/services/auth";
import { registrationFormValues } from "../../shared/form/initial-values";
import registerSchema from "../../shared/form/validations/register-schema";

export default function SignUp() {
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const formik = useFormik({
    initialValues: registrationFormValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast("User LOGIN successfully");
    } else if (isError) {
      toast.error(error.data.message);
    }
  }, [isLoading]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="userName"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        <p>{formik.errors.userName}</p>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p>{formik.errors.email}</p>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p>{formik.errors.password}</p>
        <input
          type="password"
          name="repeatPassword"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
        />
        <p>{formik.errors.repeatPassword}</p>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
