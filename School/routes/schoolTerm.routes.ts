import express from 'express'
import { SchoolTermRepository } from '../adapters/repositories/schoolTermRepository';
import { SchoolTermInteractor } from '../application/interactors/schoolTermInteractor';
import { SchoolTermController } from '../adapters/controllers/schoolTermController';
const repository = new SchoolTermRepository();

const interactor = new SchoolTermInteractor(repository);
const controller = new SchoolTermController(interactor)

const router = express.Router();

router.post('/add', controller.onCreateSchoolTerm.bind(controller))
router.get('/fetchAll', controller.onReadSchoolTerms.bind(controller))
router.get("/detail/:id", controller.onReadSchoolTermById.bind(controller));

module.exports = router
