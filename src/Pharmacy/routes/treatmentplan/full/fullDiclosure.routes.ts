import { FullDisclosureController } from "../../../adapters/controllers/treatementplan/full/fullDisclosure.controller";

const express = require("express");

const router = express.Router();

const controllers = new FullDisclosureController();

router.post(
  "/add",
  controllers.create
);
router.get(
  "/fetchAll",
  controllers.find
);
router.get(
  "/detail/:id",
  controllers.findById
);

// 
router.get(
  "/by-patient-id/:id",
  controllers.findByPatientId
);
// 
router.get(
  "/by-visit-id/:id",
  controllers.findAllByVisitId
);
router.get(
  "/score",
  controllers.findFullDisclosureScoreCategory
);


export { router as fullDisclosureRouter };
