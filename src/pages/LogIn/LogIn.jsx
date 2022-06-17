import { toast } from "react-toastify";
import { useEffect } from "react";
import { useFormik } from "formik";

import loginSchema from "../../shared/form/validations/login-shema";
import { loginFormValues } from "../../shared/form/initial-values";
import { Loader } from "../../components";
import { useLoginMutation } from "../../redux/services/auth";

export default function LogIn() {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: loginFormValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
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
      <h1>LogIn</h1>
      <form onSubmit={formik.handleSubmit}>
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

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
