/* eslint-disable @typescript-eslint/no-misused-promises */
import { AppointmentStatusRepository } from "../../adapters/repositories/appointmentStatusRepository";

import express from "express";
import { appointmentStatusInteractor } from "../../application/interactors/appointment/appointmentStatusInteractor";
import { AppointmentStatusController } from "../../adapters/controllers/appointmentStatusController";

const repository = new AppointmentStatusRepository();
const interactor = new appointmentStatusInteractor(repository);

const controllers = new AppointmentStatusController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateAppointmentStatus.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllAppointmentStatus.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetAppointmentStatusById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as appointmentStatusRouter };
