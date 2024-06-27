/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { ArticleProgressRepository } from "../../../adapters/repositories/articles/progress/articleProgressRepository";
import { ArticleProgressInteractor } from "../../../application/interactors/articles/progress/articleProgressInteractor";
import { ArticleProgressController } from "../../../adapters/controllers/articles/progress/articleProgressController";



const repository = new ArticleProgressRepository();
const interactor = new ArticleProgressInteractor(repository);

const controllers = new ArticleProgressController(interactor);

const router = express.Router();

router.post(
  "/add",
  controllers.onCreateArticleProgress.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllArticleProgress.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetArticleProgressById.bind(controllers)
);

// 
router.get("/details/:id", controllers.onGetAllArticleProgressByChapterID.bind(controllers));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as articleProgressRouter };
