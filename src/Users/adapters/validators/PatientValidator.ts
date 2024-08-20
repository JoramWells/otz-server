import { body } from "express-validator";

export const createPatientValidator = [
  body("firstName").isString().withMessage("First name must be a string"),
  body("firstName").notEmpty().trim(),

  body("middleName").isString().withMessage("Middle name must be a string"),
  body("middleName").notEmpty().trim(),

  body("maritalStatus")
    .isString()
    .withMessage("Marital Status must be a string"),
  body("maritalStatus").notEmpty().trim(),

  body("sex").isString().withMessage("Sex must be a string"),
  body("sex").notEmpty().trim(),

  body("occupation").isString().withMessage("Occupation must be a string"),
  body("occupation").notEmpty().trim(),
];