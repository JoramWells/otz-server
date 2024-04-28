const express = require('express');
const {
  addMmas, getAllMmas, getMmas,
  editMmas, deleteMmas,
} = require('../../controllers/treatmentplan/mmas.controller');

const router = express.Router();

router.post('/add', addMmas);
router.get('/fetchAll', getAllMmas);
router.get('/detail/:id', getMmas);
router.put('/edit/:id', editMmas);
router.delete('/delete/:id', deleteMmas);

module.exports = router;
