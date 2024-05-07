/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { ArticleRepository } from "../../adapters/repositories/articles/articleRepository";
import { ArticleInteractor } from "../../application/interactors/articles/articleInteractor";
import { ArticleController } from "../../adapters/controllers/articles/articleController";

const repository = new ArticleRepository();
const interactor = new ArticleInteractor(repository);

const controllers = new ArticleController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateArticle.bind(controllers));
router.get("/fetchAll", controllers.onGetAllArticles.bind(controllers));
router.get(
  "/detail/:id",
  controllers.onGetArticleById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as articleRouter };
