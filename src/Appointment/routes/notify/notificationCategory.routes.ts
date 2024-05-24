/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { NotificationCategoryRepository } from "../../adapters/repositories/notify/notificationCategoryRepository";
import { NotificationCategoryInteractor } from "../../application/interactors/notify/notificationCategoryInteractor";
import { NotificationCategoryController } from "../../adapters/controllers/notify/notificationCategoryController";



const repository = new NotificationCategoryRepository();
const interactor = new NotificationCategoryInteractor(repository);

const controllers = new NotificationCategoryController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateNotificationCategory.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllNotificationCategory.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetNotificationCategoryById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as notificationCategoryRouter };
