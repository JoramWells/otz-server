/* eslint-disable @typescript-eslint/no-misused-promises */
import { AppointmentController } from "../../adapters/controllers/appointmentController";
import { AppointmentRepository } from "../../adapters/repositories/appointmentRepository";
import { AppointmentInteractor } from "../../application/interactors/appointment/appointmentInteractor";

import express from "express";

const repository = new AppointmentRepository();
const interactor = new AppointmentInteractor(repository);

const controllers = new AppointmentController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateAppointment.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllAppointments.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetAppointmentById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export {router as appointmentRouter }