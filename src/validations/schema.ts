import * as Yup from "yup";


export const loginSchema = Yup.object({
  email: Yup.string().trim().email().required(),
  password: Yup.string().trim().required(),
});
