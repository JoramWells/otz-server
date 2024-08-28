/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { AppointmentMessageInteractor } from "../../application/interactors/appointment/appointmentMessageInteractor";
import { AppointmentMessageRepository } from "../../adapters/repositories/appointmentMessageRepoitory";
import { AppointmentMessageController } from "../../adapters/controllers/appointmentMessageController";

const repository = new AppointmentMessageRepository();
const interactor = new AppointmentMessageInteractor(repository);

const controllers = new AppointmentMessageController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateAppointmentMessage.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllAppointmentMessages.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetAppointmentMessageById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);


export { router as appointmentMessageRouter };
