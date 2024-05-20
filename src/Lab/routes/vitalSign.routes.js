const express = require('express');
const {
  addVitalSign, getAllVitalSigns,
  getVitalSignDetail,
  editVitalSign,
  deleteVitalSign,
  getVitalSignByPatientID,
} = require('../controllers/vitalSign.controller');

const router = express.Router();

router.post('/add', addVitalSign);
router.get('/fetchAll', getAllVitalSigns);
router.get('/detail/:id', getVitalSignDetail);
router.get('/patient-detail/:id', getVitalSignByPatientID);
router.put('/edit/:id', editVitalSign);
router.delete('/delete/:id', deleteVitalSign);

module.exports = router;
