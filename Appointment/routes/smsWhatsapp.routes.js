const express = require('express');

const {
  addSMSWhatsapp, getAllSMSWhatsapp, getSMSWhatsapp, editSMSWhatsapp, deleteSMSWhatsapp,
} = require('../controllers/smsWhatsapp.controller');

const router = express.Router();

router.post('/add', addSMSWhatsapp);
router.get('/fetchAll', getAllSMSWhatsapp);
router.get('/detail/:id', getSMSWhatsapp);
router.put('/edit/:id', editSMSWhatsapp);
router.delete('/delete/:id', deleteSMSWhatsapp);

module.exports = router;
