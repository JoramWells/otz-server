import { body } from "express-validator";

export const createMessageValidator = [
  // body("firstName").isString().withMessage("First name must be a string"),
  body("chatID").notEmpty().trim(),

  // body("middleName").isString().withMessage("Middle name must be a string"),
  body("senderID").notEmpty().trim(),

  // body("maritalStatus")
  //   .isString()
  //   .withMessage("Marital Status must be a string"),
  // body("maritalStatus").notEmpty().trim(),

  // body("sex").isString().withMessage("Sex must be a string"),
  body("text").notEmpty().trim(),

  // body("occupation").isString().withMessage("Occupation must be a string"),
  // body("occupation").notEmpty().trim(),
];

export const createLoginValidator = [
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("First Name cannot be empty"),
  body("firstName").trim(),

  //
  body("password")
    .isString()
    .notEmpty()
    .withMessage("First Name cannot be empty"),
  body("password").trim(),
];