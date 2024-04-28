const express = require('express');
const {
  addUptake, getAllUptake, getUptake, editUptake, deleteUptake, getUptakeCount,
  getUptakeByID,
} = require('../../controllers/treatmentplan/uptake.controller');

const router = express.Router();

router.post('/add', addUptake);
router.get('/fetchAll', getAllUptake);
router.get('/detail/:id', getUptake);
router.get('/detailByPatientID/:id', getUptakeByID);
router.get('/dailyUptakeCount', getUptakeCount);
router.put('/edit/:id', editUptake);
router.delete('/delete/:id', deleteUptake);

module.exports = router;
