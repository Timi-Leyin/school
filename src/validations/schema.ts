import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().trim().email().required(),
  password: Yup.string().trim().required(),
});

export const createUserSchema = Yup.object({
  email: Yup.string().trim().email().required(),
  firstName: Yup.string().trim().required(),
  lastName: Yup.string().trim().required(),
  matricNo: Yup.string().trim().required(),
  role: Yup.string().trim().required(),
});
