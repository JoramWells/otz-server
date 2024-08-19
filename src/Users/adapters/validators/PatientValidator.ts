import { body } from "express-validator";

export const createPatientValidator = [
  body("firstName").isString().withMessage("First name must be a string"),
  body("middleName").isString().withMessage("Middle name must be a string"),
  body("maritalStatus").isString().withMessage("Marital Status must be a string"),
  body("sex").isString().withMessage("Sex must be a string"),
  body("occupation").isString().withMessage("Occupation must be a string"),
];