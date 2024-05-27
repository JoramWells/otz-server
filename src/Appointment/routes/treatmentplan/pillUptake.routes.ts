/* eslint-disable @typescript-eslint/no-misused-promises */
import { PillUptakeRepository } from "../../adapters/repositories/treatmentplan/pillUptakeRepository";

import express from "express";
import { PillUptakeInteractor } from "../../application/interactors/treatmentplan/pillUptakeInteractor";
import { PillUptakeController } from "../../adapters/controllers/treatementplan/pillUptakeController";

const repository = new PillUptakeRepository();
const interactor = new PillUptakeInteractor(repository);

const controllers = new PillUptakeController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreatePillUptake.bind(controllers));
router.get(
  "/fetchAll",
  controllers.onGetAllPillUptake.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetPillUptakeById.bind(controllers)
);
router.get('/dailyUptakeCount', controllers.getDailyPillUptakeCount.bind(controllers));
router.put('/edit/:id', controllers.onEditPillUptake.bind(controllers));
// router.delete('/delete/:id', deletePatient);

export { router as pillUptakeRouter };
