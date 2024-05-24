/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { NotificationTypeRepository } from "../../adapters/repositories/notify/notificationTypeRepository";
import { NotificationTypeInteractor } from "../../application/interactors/notify/notificationTypeInteractor";
import { NotificationTypeController } from "../../adapters/controllers/notify/notificationTypeController";




const repository = new NotificationTypeRepository();
const interactor = new NotificationTypeInteractor(repository);

const controllers = new NotificationTypeController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateNotificationType.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllNotificationType.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetNotificationTypeById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as notificationTypeRouter };
