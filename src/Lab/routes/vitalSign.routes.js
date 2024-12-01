const express = require('express');
const {
  addVitalSign, getAllVitalSigns,
  getVitalSignDetail,
  editVitalSign,
  deleteVitalSign,
  getVitalSignByPatientID,
  getAllVitalSignDetail,
  getAllVitalSignByPatientID,
  updateBMI,
  updateWeight,
  updateHeight,
  getVitalSignByVisitID,
} = require('../controllers/vitalSign.controller');

const router = express.Router();

router.post('/add', addVitalSign);
router.get('/fetchAll', getAllVitalSigns);
router.get('/detail/:id', getVitalSignDetail);
router.get('/detail/:id', getVitalSignByVisitID);
router.get('/by-visit-id/:id', getVitalSignByPatientID);
router.get('/details/:id', getAllVitalSignDetail);
router.get('/all-details/:id', getAllVitalSignByPatientID);
router.put('/edit/:id', editVitalSign);
router.put('/update-bmi/:id', updateBMI);
router.post('/update-weight', updateWeight);
router.post('/update-height', updateHeight);
router.delete('/delete/:id', deleteVitalSign);

module.exports = router;
