const express = require('express');
const {
  addCaregiver, getAllCaregivers, getCaregiverDetail,
  editCaregiver, deleteCaregiver,
} = require('../controllers/careGiver.controller');

const router = express.Router();

router.post('/add', addCaregiver);
router.get('/fetchAll', getAllCaregivers);
router.get('/detail/:id', getCaregiverDetail);
router.put('/edit/:id', editCaregiver);
router.delete('/delete/:id', deleteCaregiver);

module.exports = router;
