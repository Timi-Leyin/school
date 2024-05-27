import * as Yup from "yup";

interface Body {
  [key: string]: string;
}
export default <T = Body>(body: T, schema: Yup.ObjectSchema<any>) => {
  try {
    const validate = schema.validateSync(body);
    return validate;
  } catch (error) {
    return error;
  }
};
