/* eslint-disable @typescript-eslint/no-misused-promises */


import express from "express";
import { NotificationSubCategoryRepository } from "../../adapters/repositories/notify/notificationSubCategoryRepository";
import { NotificationSubCategoryInteractor } from "../../application/interactors/notify/notificationSubCategoryInteractor";
import { NotificationSubCategoryController } from "../../adapters/controllers/notify/notificationSubCategoryController";




const repository = new NotificationSubCategoryRepository();
const interactor = new NotificationSubCategoryInteractor(repository);

const controllers = new NotificationSubCategoryController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateNotificationSubCategory.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllNotificationSubCategory.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetNotificationSubCategoryById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as notificationSubCategoryRouter };
