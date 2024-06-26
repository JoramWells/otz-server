/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { ChapterProgressRepository } from "../../../adapters/repositories/articles/progress/chapterProgessRepository";
import { ChapterProgressInteractor } from "../../../application/interactors/articles/progress/chqpterProgessInteractor";
import { ChapterProgressController } from "../../../adapters/controllers/articles/progress/chapterProgessController";


const repository = new ChapterProgressRepository();
const interactor = new ChapterProgressInteractor(repository);

const controllers = new ChapterProgressController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateChapterProgress.bind(controllers));
router.get("/fetchAll", controllers.onGetAllChapterProgress.bind(controllers));
router.get(
  "/detail/:id",
  controllers.onGetChapterProgressById.bind(controllers)
);

// router.get("/fetchAllArticleChaptersById/:id", controllers.onGetAllArticleChaptersById.bind(controllers));

// router.delete("/delete/:id", controllers.onDeleteQuestion.bind(controllers));

// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as chapterProgressRouter };
