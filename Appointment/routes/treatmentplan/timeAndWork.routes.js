const express = require('express');
const {
  addTimeAndWork,
  getAllTimeAndWork,
  getTimeAndWork,
  editTimeAndWork,
  deleteTimeAndWork,
} = require('../../controllers/treatmentplan/timeAndWork.controller');

const router = express.Router();

router.post('/add', addTimeAndWork);
router.get('/fetchAll', getAllTimeAndWork);
router.get('/detail/:id', getTimeAndWork);
router.put('/edit/:id', editTimeAndWork);
router.delete('/delete/:id', deleteTimeAndWork);

module.exports = router;
