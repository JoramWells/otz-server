const express = require('express');
const { addWard, getAllWards, getWardDetail, deleteWard } = require('../controllers/ward.controller');
const { editSubCounty } = require('../controllers/subCounty.controller');


const router = express.Router();

router.post('/add', addWard);
router.get('/fetchAll', getAllWards);
router.get('/detail/:id', getWardDetail);
router.put('/edit/:id', editSubCounty);
router.delete('/delete/:id', deleteWard);

module.exports = router;
