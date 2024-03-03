import express from 'express'
import { SchoolSubCategoryRepository } from '../adapters/repositories/schoolSubCategoryRepository';
import { SchoolSubCategoryInteractor } from '../application/interactors/schoolSubCategoryInteractor';
import { SchoolSubCategoryController } from '../adapters/controllers/schoolSubCategoryController';
const repository = new SchoolSubCategoryRepository();

const interactor = new SchoolSubCategoryInteractor(repository);
const controller = new SchoolSubCategoryController(interactor)

const router = express.Router();

router.post('/add', controller.onCreateSchoolSubCategory.bind(controller))
router.get('/fetchAll', controller.onReadSchoolSubCategories.bind(controller))
router.get("/detail/:id", controller.onReadSchoolSubCategoryById.bind(controller));

module.exports = router
