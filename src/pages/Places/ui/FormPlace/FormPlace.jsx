import { useEffect, useState } from "react";
import { FormRow, Input, Button } from "../../../../shared/ui";
import styles from "./FormPlace.module.css";

const fileReader = new FileReader();

export default function FormPlace({
  formik,
  previewImage,
  setPreviewImage,
  file,
  setFile,
  isLoading = false,
}) {
  useEffect(() => {
    if (file) {
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
    } else {
      setPreviewImage(previewImage);
    }
  }, [file]);

  return (
    <div className={styles.content}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <FormRow>
          <Input
            disabled={isLoading}
            autoComplete="Name"
            type="text"
            name="name"
            color="default"
            variant="rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name}
            placeholder="Name"
          />
        </FormRow>

        <FormRow>
          <Input
            disabled={isLoading}
            autoComplete="off"
            type="number"
            name="lng"
            color="default"
            variant="rounded"
            value={formik.values.lng}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lng}
            placeholder="Coordinates Lng"
          />

          <Input
            disabled={isLoading}
            autoComplete="off"
            type="number"
            name="lat"
            color="default"
            variant="rounded"
            value={formik.values.lat}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lat}
            placeholder="Coordinates lat"
          />
        </FormRow>

        <Button
          type="submit"
          fullwidth
          disabled={isLoading}
          isLoading={isLoading}
          color="dark"
          variant="rounded"
        >
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
