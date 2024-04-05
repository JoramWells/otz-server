const express = require('express');
const {
  addHospital, getAllHospitals, getHospitalDetail,
  editHospital, deleteHospital,
} = require('../controllers/hospital.controller');

const router = express.Router();

router.post('/add', addHospital);
router.get('/fetchAll', getAllHospitals);
router.get('/detail/:id', getHospitalDetail);
router.put('/edit/:id', editHospital);
router.delete('/delete/:id', deleteHospital);

module.exports = router;
