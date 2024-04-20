const express = require('express');
const { addViralLoadTest, getAllViralLoad, getAllVlCategories, getViralLoadTest, editViralLoadTest, deleteViralLoadTest } = require('../controllers/viralLoad.controller');



const router = express.Router();

router.post('/add', addViralLoadTest);
router.get('/fetchAll', getAllViralLoad);
router.get('/fetchAllVLCategory', getAllVlCategories);
router.get('/detail/:id', getViralLoadTest);
router.put('/edit/:id', editViralLoadTest);
router.delete('/delete/:id', deleteViralLoadTest);

module.exports = router;
