import * as Yup from "yup"

const questsSchema = Yup.object().shape({
    name: Yup.string().trim().required("Required"),
    count: Yup.number().min(5).max(15)
});

export default questsSchema