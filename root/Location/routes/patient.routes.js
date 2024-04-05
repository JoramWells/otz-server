const express = require('express');

const { addPatient, getAllPatients, getPatientByID, editPatient, deletePatient } = require('../controllers/patient.controller');

const router = express.Router();

router.post('/add', addPatient);
router.get('/fetchAll', getAllPatients);
router.get('/detail/:id', getPatientByID);
router.put('/edit/:id', editPatient);
router.delete('/delete/:id', deletePatient);

module.exports = router;
