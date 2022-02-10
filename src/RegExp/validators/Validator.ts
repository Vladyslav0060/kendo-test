import { alphanumericRegExp, fullNameRegExp } from "../RegExp";
export const userNameValidator = (value: string) =>
  alphanumericRegExp.test(value) ? "" : "Please enter a valid username";
export const fullNameValidator = (value: string) =>
  fullNameRegExp.test(value) ? "" : "Please enter a valid fullname";
