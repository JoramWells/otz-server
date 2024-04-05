const express = require('express');
const {
  addMeasuringUnit, getAllMeasuringUnit, getMeasuringUnit, editMeasuringUnit, deleteMeasuringUnit,
} = require('../controllers/measuringUnit.controller');

const router = express.Router();

router.post('/add', addMeasuringUnit);
router.get('/fetchAll', getAllMeasuringUnit);
router.get('/detail/:id', getMeasuringUnit);
router.put('/update/:id', editMeasuringUnit);
router.delete('/delete/:id', deleteMeasuringUnit);

module.exports = router;
