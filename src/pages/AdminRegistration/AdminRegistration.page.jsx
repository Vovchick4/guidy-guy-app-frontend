import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux/es/exports";
import { toast } from "react-toastify";

import { Loader } from "../../shared/components";
import { Input, Button } from "../../shared/ui";

import { useRegisterAdminMutation } from "../../shared/redux/services/auth";
import registerSchema from "../../shared/form/validations/register-schema";
import { registrationFormValues } from "../../shared/form/initial-values";
import { getUserSelector } from "../../shared/redux/features/authSlice";

export default function AdminRegistrationPage() {
  const [registerAdmin, { isLoading, isSuccess, isError, error }] =
    useRegisterAdminMutation();
  const user = useSelector(getUserSelector);

  const formik = useFormik({
    initialValues: registrationFormValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      if (isEmpty(user) || user?.role !== "admin") return;

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
        <Input
          type="text"
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          error={formik.errors.userName}
        />

        <Input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <Input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />

        <Input
          type="password"
          name="repeatPassword"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
        />

        <Button type="submit">Create a new Admin</Button>
      </form>
    </div>
  );
}
