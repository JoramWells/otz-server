/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { QuestionRepository } from "../../adapters/repositories/articles/questionRepository";
import { QuestionInteractor } from "../../application/interactors/articles/questionInteractor";
import { QuestionController } from "../../adapters/controllers/articles/questionController";


const repository = new QuestionRepository();
const interactor = new QuestionInteractor(repository);

const controllers = new QuestionController(interactor);

const router = express.Router();

router.post("/add", controllers.onCreateQuestion.bind(controllers));
router.get("/fetchAll", controllers.onGetAllQuestion.bind(controllers));
router.get(
  "/detail/:id",
  controllers.onGetQuestionById.bind(controllers)
);

// router.get("/fetchAllArticleChaptersById/:id", controllers.onGetAllArticleChaptersById.bind(controllers));

// router.delete("/delete/:id", controllers.onDeleteArticleById.bind(controllers));

// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as questionRouter };
