import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useEffect } from "react";

import { Loader } from "../../shared/components";
import { Input, Button } from "../../shared/ui";

import { useRegisterMutation } from "../../shared/redux/services/auth";
import { registrationFormValues } from "../../shared/form/initial-values";
import registerSchema from "../../shared/form/validations/register-schema";

export default function SignUpPage() {
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

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
