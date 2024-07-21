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
router.get("/appointmentDetail/:id", controllers.getAppointmentDetail.bind(controllers));
router.get("/priorityAppointmentDetail/:id", controllers.onGetPriorityAppointmentById.bind(controllers));
router.get("/priorityAppointments", controllers.onGetAllPriorityAppointments.bind(controllers));

router.put('/star/:id', controllers.onStar.bind(controllers));
router.put("/markAsRead/:id", controllers.onMarkAsRead.bind(controllers));
router.put("/rescheduleAppointment/:id", controllers.onReschedule.bind(controllers));

// 
router.put("/recent-appointment/:id", controllers.onFindRecentAppointmentByPatientID.bind(controllers));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export {router as appointmentRouter }
