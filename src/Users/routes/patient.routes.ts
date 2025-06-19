/* eslint-disable @typescript-eslint/no-misused-promises */
import { PatientController } from '../adapters/controllers/patient.controller';
import { PatientRepository } from '../adapters/repositories/patientRepository'
import { createLoginValidator, createPatientValidator } from '../adapters/validators/PatientValidator'
import { PatientInteractor } from '../application/interactors/patientInteractor'
import { upload } from '../middleware/uploadImage';

import express from 'express'


const repository = new PatientRepository()
const interactor = new PatientInteractor(repository)

const patientController = new PatientController()

const router = express.Router()


router.post('/add', createPatientValidator,(req,res)=>patientController.create(req,res))
router.get('/fetchAll', (req,res)=>patientController.find(req,res))
router.get('/fetch-users', (req,res)=>patientController.findUsers())
router.get('/detail/:id',(req,res)=> patientController.findById(req,res))
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
