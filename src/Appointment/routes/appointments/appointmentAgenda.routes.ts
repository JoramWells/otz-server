/* eslint-disable @typescript-eslint/no-misused-promises */
import { AppointmentAgendaController } from "../../adapters/controllers/appointmentAgendaController";
import { AppointmentAgendaRepository } from "../../adapters/repositories/appointmentAgendaRepository";
import { appointmentAgendaInteractor } from "../../application/interactors/appointment/appointmentAgendaInteractor";

import express from "express";

const repository = new AppointmentAgendaRepository();
const interactor = new appointmentAgendaInteractor(repository);

const controllers = new AppointmentAgendaController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateAppointmentAgenda.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllAppointmentAgendas.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetAppointmentAgendaById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
router.delete('/delete/:id', controllers.onDeleteAppointmentAgenda.bind(controllers));

export { router as appointmentAgendaRouter };
