import { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux/es/exports";
import { toast } from "react-toastify";

import { Loader } from "../../components";
import { useRegisterAdminMutation } from "../../redux/services/auth";
import registerSchema from "../../shared/form/validations/register-schema";
import { registrationFormValues } from "../../shared/form/initial-values";
import { getUserSelector } from "../../redux/features/authSlice";

export default function AdminRegistration() {
  const [registerAdmin, { isLoading, isSuccess, isError, error }] =
    useRegisterAdminMutation();
  const user = useSelector(getUserSelector);

  const formik = useFormik({
    initialValues: registrationFormValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      if (!user && user?.role !== "admin") return;

      registerAdmin({ ...values, role: user?.role });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast("You Created New Admin!!!");
    } else if (isError) {
      toast.error(error.data.message);
    }
  }, [isLoading]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1>AdminRegistration</h1>
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
