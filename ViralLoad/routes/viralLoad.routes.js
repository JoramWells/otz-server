const express = require('express');
const {
  addViralLoad, getAllViralLoads,
  getViralLoad, editViralLoad,
  deleteViralLoad,
} = require('../controllers/viralLoad.controller');

const router = express.Router();

router.post('/add', addViralLoad);
router.get('/fetchAll', getAllViralLoads);
router.get('/detail/:id', getViralLoad);
router.put('/edit/:id', editViralLoad);
router.delete('/delete/:id', deleteViralLoad);

module.exports = router;
