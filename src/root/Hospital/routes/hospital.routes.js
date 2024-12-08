const express = require('express');
const {
  addHospital, getAllHospitals, getHospitalDetail,
  editHospital, deleteHospital,
  updateHospitalLocation,
  searchHospital,
} = require('../controllers/hospital.controller');

const router = express.Router();

router.post('/add', addHospital);
router.get('/fetchAll', getAllHospitals);
router.get('/detail/:id', getHospitalDetail);
router.get('/search-hospital', searchHospital);
router.put('/edit/:id', editHospital);
router.put('/update-hospital-location/:id', updateHospitalLocation);
router.delete('/delete/:id', deleteHospital);

module.exports = router;
