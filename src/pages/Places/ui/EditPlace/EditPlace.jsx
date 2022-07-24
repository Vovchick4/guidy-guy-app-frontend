import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import previewImages from "../../../../shared/images/authWallpers4k.jpg";

import {
  useUpdatePlaceMutation,
  useUploadImagePlaceMutation,
  useGetPlacesByIdQuery,
} from "../../../../shared/redux/services/places";
import { FormPlace } from "../";
import { CrudPlaceFormValues } from "../../../../shared/form/initial-values";
import validationSchema from "../../../../shared/form/validations/crud-place-schema";
import { imageURL } from "../../../../shared/constants";
import { getErrorResponseMessage } from "../../../../shared/utils";

const skipInitValuesKey = ["lng", "lat"];
export default function EditPlace({ placeId }) {
  const [uploadImagePlace] = useUploadImagePlaceMutation();
  const [updatePlace, { isLoading }] = useUpdatePlaceMutation();
  const { data, isLoading: getPlaceByIdLoading } =
    useGetPlacesByIdQuery(placeId);

  const [previewImage, setPreviewImage] = useState(previewImages);
  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: CrudPlaceFormValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }

      Object.keys(values).forEach((key) => {
        if (!skipInitValuesKey.includes(key)) {
          formData.append(key, values[key]);
        }
      });

      const resData = {
        placeId,
        name: values.name,
        coordinates: {
          type: "Point",
          coordinates: [Number(values.lng), Number(values.lat)],
        },
        like: false,
      };

      toast
        .promise(updatePlace(resData), {
          pending: "Updating Place ...",
          success: "Updated Place",
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

  // SET TO FORMIK DATA
  useEffect(() => {
    if (data) {
      //   Object.keys(formik.values).forEach((key) => {
      //     if (!skipInitValuesKey.includes(key)) {
      //       formik.setValues({ [key]: data[key] });
      //     }
      //   });
      formik.setValues({
        name: data["name"],
        like: data["like"],
        lng: 0,
        lat: 0,
      });

      //   console.log(formik.values);

      // Set coords
      if (data?.coordinates) {
        formik.setValues({
          name: data["name"],
          like: data["like"],
          lng: data.coordinates.coordinates[0],
          lat: data.coordinates.coordinates[1],
        });
      }

      // Set coords PLACEHODERIMAGE
      if (data?.fileName) {
        setPreviewImage(imageURL + data.fileName);
      }
    }
  }, [placeId, data]);

  return (
    <FormPlace
      formik={formik}
      file={file}
      setFile={setFile}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      isLoading={isLoading || getPlaceByIdLoading}
    />
  );
}
