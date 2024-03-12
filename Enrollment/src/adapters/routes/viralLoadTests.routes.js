const express = require('express');

const { addViralLoadTest, getAllViralLoadTests, getViralLoadTest, 
  editViralLoadTest, deleteViralLoadTest } = require('../controllers/viralLoadTests.controller');

const router = express.Router();

router.post('/add', addViralLoadTest);
router.get('/fetchAll', getAllViralLoadTests);
router.get('/detail/:id', getViralLoadTest);
router.put('/edit/:id', editViralLoadTest);
router.delete('/delete/:id', deleteViralLoadTest);

module.exports = router;
