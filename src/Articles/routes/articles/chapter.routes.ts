/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";

import { upload } from "../../middleware/uploadImage";
import { ChapterRepository } from "../../adapters/repositories/articles/chapterRepository";
import { ChapterInteractor } from "../../application/interactors/articles/chapterInteractor";
import { ChapterController } from "../../adapters/controllers/articles/chapterController";


const repository = new ChapterRepository();
const interactor = new ChapterInteractor(repository);

const controllers = new ChapterController(interactor);

const router = express.Router();

router.post(
  "/add",
  upload.single("thumbnail"),
  controllers.onCreateChapter.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllChapter.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetChapterById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as chapterRouter };
