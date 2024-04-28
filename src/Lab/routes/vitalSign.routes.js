const express = require('express');
const {
  addVitalSign, getAllVitalSigns,
  getVitalSignDetail,
  editVitalSign,
  deleteVitalSign,
} = require('../controllers/vitalSign.controller');

const router = express.Router();

router.post('/add', addVitalSign);
router.get('/fetchAll', getAllVitalSigns);
router.get('/detail/:id', getVitalSignDetail);
router.put('/edit/:id', editVitalSign);
router.delete('/delete/:id', deleteVitalSign);

module.exports = router;
