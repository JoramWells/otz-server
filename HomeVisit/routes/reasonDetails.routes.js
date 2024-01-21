const express = require('express');
const {addHomeVisitReason, getAllHomeVisitReasons,
  getHomeVisitReasonDetail, editHomeVisitReason,
  deleteHomeVisitReason} = require('../controllers/reasonsDetails.controller');
const router = express.Router();

router.post('/add', addHomeVisitReason);
router.get('/fetchAll', getAllHomeVisitReasons);
router.get('/detail/:id', getHomeVisitReasonDetail);
router.put('/edit/:id', editHomeVisitReason);
router.delete('/delete/:id', deleteHomeVisitReason);

module.exports = router;
