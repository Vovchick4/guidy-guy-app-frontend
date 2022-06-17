import { useFormik } from "formik";
import * as Yup from "yup";

import registerSchema from "../../shared/form/validations/register-schema";
import { registrationFormValues } from "../../shared/form/initial-values";

export default function AdminRegistration() {
  const formik = useFormik({
    initialValues: registrationFormValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <h1>AdminRegistration</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p>{formik.errors.name}</p>
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
