import express from 'express'
import { SchoolTermHolidayRepository } from '../adapters/repositories/schoolTermHolidayRepository';
import { SchoolTermHolidayInteractor } from '../application/interactors/schoolTermHolidayInteractor';
import { SchoolTermHolidayController } from '../adapters/controllers/schoolTermHolidayController';
const repository = new SchoolTermHolidayRepository();

const interactor = new SchoolTermHolidayInteractor(repository);
const controller = new SchoolTermHolidayController(interactor)

const router = express.Router();

router.post('/add', controller.onCreateSchoolTermHoliday.bind(controller))
router.get('/fetchAll', controller.onReadSchoolTermHolidays.bind(controller))
router.get("/detail/:id", controller.onReadSchoolTermHolidayById.bind(controller));

module.exports = router
