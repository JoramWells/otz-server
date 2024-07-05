/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { PatientNotificationRepository } from "../../adapters/repositories/notify/paitientNotificationRepository";
import { PatientNotificationInteractor } from "../../application/interactors/notify/patientNotificationInteractor";
import { PatientNotificationController } from "../../adapters/controllers/notify/patientNotificationController";

const repository = new PatientNotificationRepository();
const interactor = new PatientNotificationInteractor(repository);

const controllers = new PatientNotificationController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreatePatientNotification.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllPatientNotification.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetPatientNotificationById.bind(controllers)
);

router.get(
  "/details/:id",
  controllers.onGetNotificationByPatientId.bind(controllers)
);

router.put(
  "/markAsRead/:id",
  controllers.onMarkAsRead.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as patientNotificationRouter };
