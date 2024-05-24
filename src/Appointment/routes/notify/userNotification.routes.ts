/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { UserNotificationRepository } from "../../adapters/repositories/notify/userNotificationEntity";
import { UserNotificationInteractor } from "../../application/interactors/notify/userNotificationInteractor";
import { UserNotificationController } from "../../adapters/controllers/notify/userNotificationController";




const repository = new UserNotificationRepository();
const interactor = new UserNotificationInteractor(repository);

const controllers = new UserNotificationController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateUserNotification.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllUserNotification.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetUserNotificationById.bind(controllers)
);
// router.put('/edit/:id', editUser);
// router.delete('/delete/:id', deleteUser);

export { router as userNotificationRouter };
