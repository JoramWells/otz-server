const express = require('express');
const {
  addPills, getAllPills, getPill, editPill, deletePill,
} = require('../controllers/pill.controller');

const router = express.Router();

router.post('/add', addPills);
router.get('/fetchAll', getAllPills);
router.get('/detail/:id', getPill);
router.put('/update/:id', editPill);
router.delete('/delete/:id', deletePill);

module.exports = router;
