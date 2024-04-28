const express = require('express');

const { addSubCounty, getAllSubCounties, getSubCountyDetail, editSubCounty, deleteSubCounty } = require('../controllers/subCounty.controller');

const router = express.Router();

router.post('/add', addSubCounty);
router.get('/fetchAll', getAllSubCounties);
router.get('/detail/:id', getSubCountyDetail);
router.put('/edit/:id', editSubCounty);
router.delete('/delete/:id', deleteSubCounty);

module.exports = router;
