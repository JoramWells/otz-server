const express = require('express');
const { addChat, getChats, getChat } = require('../../controllers/chats/chat.controllers');

const router = express.Router();

router.post('/add', addChat);
router.get('/fetchAll/:id', getChat);
router.get('/detail/:id1/:id2', getChats);
// router.put('/edit/:id', editNotification);
// router.delete('/delete/:id', deleteNotification);

module.exports = router;
