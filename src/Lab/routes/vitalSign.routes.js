const express = require('express');
const {
  addVitalSign, getAllVitalSigns,
  getVitalSignDetail,
  editVitalSign,
  deleteVitalSign,
  getVitalSignByPatientID,
  getAllVitalSignDetail,
} = require('../controllers/vitalSign.controller');

const router = express.Router();

router.post('/add', addVitalSign);
router.get('/fetchAll', getAllVitalSigns);
router.get('/detail/:id', getVitalSignDetail);
router.get('/patient-detail/:id', getVitalSignByPatientID);
router.get('/details/:id', getAllVitalSignDetail);
router.put('/edit/:id', editVitalSign);
router.delete('/delete/:id', deleteVitalSign);

module.exports = router;
