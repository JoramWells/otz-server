const express = require('express');

const { addOccupation, getAllOccupations, getOccupationDetail, 
  editOccupation, deleteOccupation } = require('../controllers/occupation.controller');

const router = express.Router();

router.post('/add', addOccupation);
router.get('/fetchAll', getAllOccupations);
router.get('/detail/:id', getOccupationDetail);
router.put('/edit/:id', editOccupation);
router.delete('/delete/:id', deleteOccupation);

module.exports = router;
