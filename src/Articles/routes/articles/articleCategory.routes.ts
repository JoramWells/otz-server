/* eslint-disable @typescript-eslint/no-misused-promises */
import { ArticleCategoryRepository } from "../../adapters/repositories/articles/articleCategoryRepository";

import express from "express";
import { ArticleCategoryInteractor } from "../../application/interactors/articles/articleCategoryInteractor";
import { ArticleCategoryController } from "../../adapters/controllers/articles/articleCategoryController";
import { upload } from "../../middleware/uploadImage";

const repository = new ArticleCategoryRepository();
const interactor = new ArticleCategoryInteractor(repository);

const controllers = new ArticleCategoryController(interactor);

const router = express.Router();

router.post(
  "/add",
  upload.single("thumbnail"),
  controllers.onCreateArticleCategory.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllArticleCategory.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetArticleCategoryById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as articleCategoryRouter };
