import { toast } from "react-toastify";
import { useState } from "react";
import { useFormik } from "formik";

import {
  useCreatePlaceMutation,
  useUploadImagePlaceMutation,
} from "../../../../shared/redux/services/places";
import { getErrorResponseMessage } from "../../../../shared/utils";

import previewImages from "../../../../shared/images/authWallpers4k.jpg";
import { FormPlace } from "../";
import validationSchema from "../../../../shared/form/validations/crud-place-schema";
import { CrudPlaceFormValues } from "../../../../shared/form/initial-values";

export default function AddPlace() {
  const [uploadImagePlace] = useUploadImagePlaceMutation();
  const [createPlace, { isLoading }] = useCreatePlaceMutation();
  const [previewImage, setPreviewImage] = useState(previewImages);
  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: CrudPlaceFormValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      const skipInitValuesKey = ["lng", "lat"];

      if (file) {
        formData.append("file", file);
      }

      Object.keys(values).forEach((key) => {
        if (!skipInitValuesKey.includes(key)) {
          formData.append(key, values[key]);
        }
      });

      const resData = {
        name: values.name,
        coordinates: {
          type: "Point",
          coordinates: [Number(values.lng), Number(values.lat)],
        },
        like: false,
      };

      toast
        .promise(createPlace(resData), {
          pending: "Creating Place ...",
          success: "Created Place",
          error: (err) => `${getErrorResponseMessage(err)}`,
        })
        .then((res) => {
          if (file) {
            toast.promise(uploadImagePlace(formData), {
              pending: "Uploading image to Place ...",
              success: "Uploaded image to Place",
              error: (err) => `${getErrorResponseMessage(err)}`,
            });
          }
        });
    },
  });

  return (
    <FormPlace
      formik={formik}
      file={file}
      setFile={setFile}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      isLoading={isLoading}
    />
  );
}
