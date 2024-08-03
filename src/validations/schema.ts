import * as Yup from "yup";

export const registerSchema = Yup.object({
  email: Yup.string().trim().email().required(),
  password: Yup.string().trim().required(),
  firstName: Yup.string().trim().required(),
  lastName: Yup.string().trim().required(),
});

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

export const createVoteSchema = Yup.object({
  title: Yup.string().trim().required(),
  visibility: Yup.string().trim().required(),
  options: Yup.array().of(
    Yup.object().shape({
      text: Yup.string().required("Option is required"),
    })
  ),
  startDate: Yup.string().trim().required(),
  endDate: Yup.string().trim().required(),
  whoCanVote: Yup.string().trim().required(),
});
