/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { upload } from "../../middleware/uploadImage";
import { LineListCSVRepository } from "../../adapters/repositories/articles/progress/linelistCSVRepository";
import { LineListCSVInteractor } from "../../application/interactors/articles/linelistCSVInteractor";
import { LineListController } from "../../adapters/controllers/articles/lineListCSVController";

const repository = new LineListCSVRepository();
const interactor = new LineListCSVInteractor(repository);

const controllers = new LineListController(interactor);

const router = express.Router();

router.post(
  "/add",
  upload.single("thumbnail"),
  controllers.onCreateLineListCSV.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllLineListCSVs.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetLineListCSVByIds.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete("/delete/:id", controllers.onDeleteBook.bind(controllers));


export { router as lineListCSVRouter };
