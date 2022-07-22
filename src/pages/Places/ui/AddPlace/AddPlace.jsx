import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

import previewImages from "../../../../shared/images/authWallpers4k.jpg";

import styles from "./AddPlace.module.css";
import { Button, FormRow, Input } from "../../../../shared/ui";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  coordinates: Yup.object({}).required("Required"),
});

const fileReader = new FileReader();

export default function AddPlace() {
  const [previewImage, setPreviewImage] = useState(previewImages);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
    } else {
      setPreviewImage(previewImages);
    }
  }, [file]);

  const formik = useFormik({
    initialValues: { name: "", coordinates: {} },
    validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <div className={styles.content}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <FormRow>
          <Input
            autoComplete="Name"
            type="text"
            name="name"
            color="default"
            variant="rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Name"
          />
        </FormRow>

        <FormRow>
          <Input
            autoComplete="Name"
            type="text"
            name="name"
            color="default"
            variant="rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Name"
          />
        </FormRow>

        <FormRow>
          <Input
            autoComplete="Name"
            type="text"
            name="name"
            color="default"
            variant="rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Name"
          />
        </FormRow>

        <Button type="submit" fullwidth color="dark" variant="rounded">
          Create
        </Button>
      </form>
      <div className={styles.select_image}>
        <div className={styles.select_image_content}>
          <img
            className={styles.select_image_content_preview}
            src={previewImage}
            alt={previewImage}
          />
        </div>

        <div className={styles.icon_click}>
          <Input.InputIcon onChange={(e) => setFile(e.target.files[0])} />
        </div>
      </div>
    </div>
  );
}
