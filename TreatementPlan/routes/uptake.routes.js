const express = require('express');
const {
  addUptake, getAllUptake, getUptake, editUptake, deleteUptake,
} = require('../controllers/uptake.controller');

const router = express.Router();

router.post('/add', addUptake);
router.get('/fetchAll', getAllUptake);
router.get('/detail/:id', getUptake);
router.put('/edit/:id', editUptake);
router.delete('/delete/:id', deleteUptake);

module.exports = router;
