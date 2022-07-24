import * as Yup from "yup"

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    lng: Yup.number("Number").required("Required"),
    lat: Yup.number("Number").required("Required"),
});

export default validationSchema