import { DisclosureTrackerController } from "../../adapters/controllers/controllers/treatementplan/disclosureTracker.controller";

const express = require('express');

const router = express.Router();


const controllers = new DisclosureTrackerController();


router.post('/add', controllers.create);
router.get(
  "/fetch-all-full",
  controllers.findFullDisclosure
);
router.get(
  "/fetch-all-partial",
  controllers.findPartialDisclosure
);
router.get('/detail/:id', controllers.findById);
router.get(
  "/fetch-by-full-status",
  controllers.findUsersByFullStatus
);
router.get(
  "/fetch-by-partial-status",
  controllers.findUsersByPartialStatus
);

// router.put('/edit/:id', editTimeAndWork);

export { router as disclosureTrackerRouter };
