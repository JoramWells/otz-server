/* eslint-disable @typescript-eslint/no-misused-promises */
import { PatientController } from '../adapters/controllers/patientController'
import { PatientRepository } from '../adapters/repositories/patientRepository'
import { createLoginValidator, createPatientValidator } from '../adapters/validators/PatientValidator'
import { PatientInteractor } from '../application/interactors/patientInteractor'
import { upload } from '../middleware/uploadImage';

import express from 'express'


const repository = new PatientRepository()
const interactor = new PatientInteractor(repository)

const patientController = new PatientController(interactor)

const router = express.Router()


router.post('/add', createPatientValidator,patientController.onCreatePatient.bind(patientController))
router.get('/fetchAll', patientController.onGetAllPatients.bind(patientController))
router.get('/fetch-users', patientController.onGetAllUserPatients.bind(patientController))
router.get('/detail/:id', patientController.onGetPatientById.bind(patientController))
router.get('/user-patient-detail/:id', patientController.onGetPatientByUserId.bind(patientController))
router.get('/fetchAllPMTCT', patientController.onGetAllPMTCTPatients.bind(patientController))
router.get('/fetchAllOTZ', patientController.onGetAllOTZPatients.bind(patientController))
router.get('/important-patients', patientController.onGetImportantPatient.bind(patientController))
router.get('/search-patients', patientController.onSearchPatient.bind(patientController))
router.put('/edit/:id', patientController.onEditPatientProfile.bind(patientController))
router.post("/login", createLoginValidator, patientController.login.bind(patientController));
router.put("/update-avatar/:id", upload.single('file') , patientController.onUpdatePatientProfileAvatar.bind(patientController));
router.put("/update-username/:id", patientController.onUpdatePatientUsername.bind(patientController));
router.put("/update-password/:id", patientController.onUpdatePatientPassword.bind(patientController));

router.put("/mark-important/:id", patientController.onMarkAsImportant.bind(patientController));

router.delete('/delete/:id', patientController.onDeletePatient.bind(patientController));

export {router as patientRouter}
