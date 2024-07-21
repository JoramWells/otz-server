/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { upload } from "../../middleware/uploadImage";
import { FacilityMAPSRepository } from "../../adapters/repositories/etl/facilityMAPRepository";
import { FacilityMAPCSVInteractor } from "../../application/interactors/etl/facilityMAPInteractor";
import { FacilityMAPController } from "../../adapters/controllers/etl/facilityMAPController";


const repository = new FacilityMAPSRepository();
const interactor = new FacilityMAPCSVInteractor(repository);

const controllers = new FacilityMAPController(interactor);

const router = express.Router();

router.post(
  "/add",
  upload.single("thumbnail"),
  controllers.onCreateFacilityMAPCSV.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllFacilityMAPCSVs.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetFacilityMAPCSVByIds.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete("/delete/:id", controllers.onDeleteBook.bind(controllers));


export { router as facilityMAPRouter };
