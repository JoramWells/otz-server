/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { NotificationRepository } from "../../adapters/repositories/notify/notificationRepository";
import { NotificationInteractor } from "../../application/interactors/notify/notificationInteractor";
import { NotificationController } from "../../adapters/controllers/notify/notificationController";


const repository = new NotificationRepository();
const interactor = new NotificationInteractor(repository);

const controllers = new NotificationController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateNotification.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllNotification.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetNotificationById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as notificationRouter };
