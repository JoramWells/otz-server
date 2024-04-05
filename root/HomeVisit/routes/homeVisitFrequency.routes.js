const express = require('express');
const {addHomeVisitFrequency, getAllHomeVisitFrequencies,
  getHomeVisitFrequencyDetail,
  editHomeVisitFrequency, deleteHomeVisitFrequency,
} = require('../controllers/homeVisitFrequency.controller');

const router = express.Router();

router.post('/add', addHomeVisitFrequency);
router.get('/fetchAll', getAllHomeVisitFrequencies);
router.get('/detail/:id', getHomeVisitFrequencyDetail);
router.put('/edit/:id', editHomeVisitFrequency);
router.delete('/delete/:id', deleteHomeVisitFrequency);

module.exports = router;
