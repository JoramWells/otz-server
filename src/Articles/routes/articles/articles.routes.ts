/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { ArticleRepository } from "../../adapters/repositories/articles/articleRepository";
import { ArticleInteractor } from "../../application/interactors/articles/articleInteractor";
import { ArticleController } from "../../adapters/controllers/articles/articleController";
import { upload } from "../../middleware/uploadImage";

const repository = new ArticleRepository();
const interactor = new ArticleInteractor(repository);

const controllers = new ArticleController(interactor);

const router = express.Router();

router.post("/add", upload.single('file'),controllers.onCreateArticle.bind(controllers));
router.get("/fetchAll", controllers.onGetAllArticles.bind(controllers));
router.get(
  "/detail/:id",
  controllers.onGetArticleById.bind(controllers)
);

router.get("/fetchAllArticleChaptersById/:id", controllers.onGetAllArticleChaptersById.bind(controllers));

router.delete("/delete/:id", controllers.onDeleteArticleById.bind(controllers));

router.put('/edit/:id', controllers.onEditArticle.bind(controllers));
// router.delete('/delete/:id', deletePatient);

export { router as articleRouter };
