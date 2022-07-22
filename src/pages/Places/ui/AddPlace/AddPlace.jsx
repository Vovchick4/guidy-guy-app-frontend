import * as Yup from "yup";
import { useFormik } from "formik";

import styles from "./AddPlace.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  coordinates: Yup.object({}).required("Required"),
});

export default function AddPlace() {
  const formik = useFormik({
    initialValues: { name: "", coordinates: {} },
    validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <div className={styles.content}>
      <form></form>
      <div></div>
    </div>
  );
}
