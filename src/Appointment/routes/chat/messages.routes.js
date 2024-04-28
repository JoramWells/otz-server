const express = require('express');

const { addChatMessage, getAllChatMessages, getChatMessage } = require('../../controllers/chats/messages.controller');

const router = express.Router();

router.post('/add', addChatMessage);
router.get('/fetchAll', getAllChatMessages);
router.get('/detail/:id', getChatMessage);
// router.put('/edit/:id', editSMSWhatsapp);
// router.delete('/delete/:id', deleteSMSWhatsapp);

module.exports = router;
