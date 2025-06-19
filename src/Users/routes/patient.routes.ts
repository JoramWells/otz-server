/* eslint-disable @typescript-eslint/no-misused-promises */
import { PatientController } from '../adapters/controllers/patient.controller';
import { createLoginValidator, createPatientValidator } from '../adapters/validators/PatientValidator'
import { upload } from '../middleware/uploadImage';

import express from 'express'


const patientController = new PatientController()

const router = express.Router()

router.post('/add', createPatientValidator,patientController.create)
router.get('/fetchAll', patientController.find)
router.get('/fetch-users', patientController.findUsers)
router.get('/detail/:id',patientController.findById)
router.get('/user-patient-detail/:id', patientController.findPatientByUserId)
router.get('/fetchAllPMTCT', patientController.findAllPMTCTPatients)
router.get('/fetchAllOTZ', patientController.findOTZ)
router.get('/important-patients', patientController.findImportant)
router.get('/search-patients', patientController.search)
router.put('/edit/:id', patientController.edit)
router.post("/login", createLoginValidator, patientController.login);
router.put("/update-avatar/:id", upload.single('file') , patientController.editAvatar);
router.put("/update-username/:id", patientController.editUsername);
router.put("/update-password/:id", patientController.editPassword);

router.put("/mark-important/:id", patientController.important);

router.delete('/delete/:id', patientController.delete)

export {router as patientRouter}
