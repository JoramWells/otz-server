const express = require('express');
const {
  addTimeAndWork,
  getAllTimeAndWork,
  getTimeAndWork,
  editTimeAndWork,
  deleteTimeAndWork,
  updateTimeAndWorkMorningSchedule,
  updateTimeAndWorkEveningSchedule,
} = require('../../controllers/treatmentplan/timeAndWork.controller');

const router = express.Router();

router.post('/add', addTimeAndWork);
router.get('/fetchAll', getAllTimeAndWork);
router.get('/detail/:id', getTimeAndWork);
router.put('/edit/:id', editTimeAndWork);
router.put('/update-morning-schedule/:id', updateTimeAndWorkMorningSchedule);
router.put('/update-evening-schedule/:id', updateTimeAndWorkEveningSchedule);
router.delete('/delete/:id', deleteTimeAndWork);

module.exports = router;
