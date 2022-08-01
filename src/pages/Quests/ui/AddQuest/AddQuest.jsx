import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { Input, Button, FormRow } from "../../../../shared/ui";

import { QuestsFormValues } from "../../../../shared/form/initial-values";
import questsSchema from "../../../../shared/form/validations/quests-schema";

import styles from "./AddQuest.module.css";
import { getErrorResponseMessage } from "../../../../shared/utils";
import { useCreateQuestMutation } from "../../../../shared/redux/services/quests";
import { getUserSelector } from "../../../../shared/redux/features/authSlice";

export default function AddQuest() {
  const { id } = useSelector(getUserSelector);
  const [createQuestMutation, { isLoading }] = useCreateQuestMutation();

  const formik = useFormik({
    initialValues: QuestsFormValues,
    validationSchema: questsSchema,
    onSubmit: async (values) => {
      await toast.promise(createQuestMutation({ userId: id, ...values }), {
        pending: "Creating Quest ...",
        success: "Created Quest",
        error: (err) => `${getErrorResponseMessage(err)}`,
      });
    },
  });

  return (
    <div className={styles.content}>
      <form onSubmit={formik.handleSubmit}>
        <FormRow>
          <Input
            autoComplete="off"
            type="text"
            name="name"
            color="danger"
            variant="rounded"
            placeholder="Input quest name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.errors.name}
          />
        </FormRow>
        <FormRow>
          <Input
            autoComplete="off"
            type="number"
            name="count"
            color="danger"
            variant="rounded"
            placeholder="Input count places"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.count}
            error={formik.errors.count}
          />
        </FormRow>
        <Button type="submit" variant="rounded" color="dark" fullwidth>
          Generate Quest
        </Button>
      </form>
    </div>
  );
}
