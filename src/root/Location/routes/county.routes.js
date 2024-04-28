const express = require('express');
const { addCounty, getAllCounties, getCountyDetail,
  editCounty, deleteCounty } = require('../controllers/county.controller');

const router = express.Router();

router.post('/add', addCounty);
router.get('/fetchAll', getAllCounties);
router.get('/detail/:id', getCountyDetail);
router.put('/edit/:id', editCounty);
router.delete('/delete/:id', deleteCounty);

module.exports = router;
