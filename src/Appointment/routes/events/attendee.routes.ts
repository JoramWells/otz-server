/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { AttendeeRepository } from "../../adapters/repositories/events/attendeeRepository";
import { AttendeeInteractor } from "../../application/interactors/events/attendeeInteractor";
import { AttendeeController } from "../../adapters/controllers/events/attendeeController";

const repository = new AttendeeRepository();
const interactor = new AttendeeInteractor(repository);

const controllers = new AttendeeController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateAttendee.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllAttendee.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetAttendeeById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as attendeeRouter };
