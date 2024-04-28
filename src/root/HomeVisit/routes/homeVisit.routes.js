const express = require('express');
const {addHomeVisit, getAllHomeVisits, getHomeVisitDetails,
  editHomeVisit,
  deleteHomeVisit} = require('../controllers/homeVisitDetails.controller');


const router = express.Router();

router.post('/add', addHomeVisit);
router.get('/fetchAll', getAllHomeVisits);
router.get('/detail/:id', getHomeVisitDetails);
router.put('/edit/:id', editHomeVisit);
router.delete('/delete/:id', deleteHomeVisit);

module.exports = router;
