/* eslint-disable @typescript-eslint/no-misused-promises */

import express from "express";
import { CoursesRepository } from "../../adapters/repositories/articles/coursesRepository";
import { CourseInteractor } from "../../application/interactors/articles/coursesInteractor";
import { CoursesController } from "../../adapters/controllers/articles/coursesController";




const repository = new CoursesRepository();
const interactor = new CourseInteractor(repository);

const controllers = new CoursesController(interactor);

const router = express.Router();

router.post(
  "/add",
  controllers.onCreateCourses.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllCourses.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetCoursesById.bind(controllers)
);

// 
// router.get("/fetchAllBooksDetail/:id", controllers.onGetAllBooksById.bind(controllers));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as coursesRouter };
