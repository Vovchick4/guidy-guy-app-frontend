import { toast } from "react-toastify";
import { useEffect } from "react";
import { useFormik } from "formik";

import styles from "./Login.module.css";

import { Loader } from "../../shared/components";
import { Input, Button } from "../../shared/ui";

import loginSchema from "../../shared/form/validations/login-shema";
import { loginFormValues } from "../../shared/form/initial-values";
import { useLoginMutation } from "../../shared/redux/services/auth";

export default function LogInPage() {
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
    <div className={styles.content}>
      <h1>LogIn</h1>
      <form className={styles.content_form} onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          name="email"
          color="success"
          variant="outline"
          fullwidth
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          placeholder={"Username/email"}
        />

        <Input
          type="password"
          name="password"
          color="success"
          variant="outline"
          fullwidth
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
          placeholder={"password"}
        />

        <div className={styles.content_button}>
          <Button type="submit" fullwidth color="dark" variant="rounded">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}
