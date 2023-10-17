import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name: Yup.string().required("Please enter your name").min(3).max(25),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(8),
    confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Password must match"),
});

