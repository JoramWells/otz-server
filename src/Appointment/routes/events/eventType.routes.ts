/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { EventTypeRepository } from "../../adapters/repositories/events/eventTypeRepository";
import { EventTypeInteractor } from "../../application/interactors/events/eventTypeInteractor";
import { EventTypeController } from "../../adapters/controllers/events/eventTypeController";

const repository = new EventTypeRepository();
const interactor = new EventTypeInteractor(repository);

const controllers = new EventTypeController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateEventType.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllEventType.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetEventTypeById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as eventTypeRouter };
