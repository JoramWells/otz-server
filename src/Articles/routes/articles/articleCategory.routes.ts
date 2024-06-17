/* eslint-disable @typescript-eslint/no-misused-promises */
import { ArticleCategoryRepository } from "../../adapters/repositories/articles/bookRepository";

import express from "express";
import { upload } from "../../middleware/uploadImage";
import { BookController } from "../../adapters/controllers/articles/bookController";
import { BookInteractor } from "../../application/interactors/articles/bookInteractor";

const repository = new ArticleCategoryRepository();
const interactor = new BookInteractor(repository);

const controllers = new BookController(interactor);

const router = express.Router();

router.post(
  "/add",
  upload.single("thumbnail"),
  controllers.onCreateBook.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllBook.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetBookById.bind(controllers)
);
// router.put('/edit/:id', editPatient);
router.delete("/delete/:id", controllers.onDeleteBook.bind(controllers));


export { router as bookRouter };
