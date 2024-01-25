const express = require('express');
const {addDisclosureChecklist, getAllDisclosureChecklists,
  getDisclosureChecklist, editDisclosureChecklist,
  deleteDisclosureChecklist,
} = require('../controllers/disclosureChecklist.controller');

const router = express.Router();

router.post('/add', addDisclosureChecklist);
router.get('/fetchAll', getAllDisclosureChecklists);
router.get('/detail/:id', getDisclosureChecklist);
router.put('/edit/:id', editDisclosureChecklist);
router.delete('/delete/:id', deleteDisclosureChecklist);

module.exports = router;
