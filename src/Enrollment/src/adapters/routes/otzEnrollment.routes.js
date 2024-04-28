const express = require('express');
const {
  addOTZEnrollment, getAllOTZEnrollment, getOTZEnrollment,
  editOTZEnrollment, deleteOTZEnrollment, getOTZPatientEnrollmentDetails,
} = require('../controllers/otzEnrollment.controller');

const router = express.Router();

router.post('/add', addOTZEnrollment);
router.get('/fetchAll', getAllOTZEnrollment);
router.get('/detail/:id', getOTZEnrollment);
router.get('/patient/:id', getOTZPatientEnrollmentDetails);
router.put('/edit/:id', editOTZEnrollment);
router.delete('/delete/:id', deleteOTZEnrollment);

module.exports = router;
