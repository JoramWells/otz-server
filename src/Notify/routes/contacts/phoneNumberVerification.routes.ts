/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { PhoneNumberVerificationRepository } from "../../adapters/repositories/contacts/phoneNumberRepository";
import { PhoneNumberVerificationInteractor } from "../../application/interactors/contact/phoneNumberVerificationInteractor";
import { PhoneNumberVerificationController } from "../../adapters/controllers/contacts/phoneNumberVerificationController";


const repository = new PhoneNumberVerificationRepository();
const interactor = new PhoneNumberVerificationInteractor(repository);

const controllers = new PhoneNumberVerificationController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreatePhoneNumberVerifications.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllPhoneNumberVerifications.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetPhoneNumberVerificationsById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as phoneNumberVerificationRouter };
