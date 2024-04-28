const express = require('express');
const {
  addMessageTextReply, getAllMessageTextReply,
  getMessageTextReply, editMessageTextReply, deleteMessageTextReply,
} = require('../../controllers/notifications/messageTextReply');

const router = express.Router();

router.post('/add', addMessageTextReply);
router.get('/fetchAll', getAllMessageTextReply);
router.get('/detail/:id', getMessageTextReply);
router.put('/edit/:id', editMessageTextReply);
router.delete('/delete/:id', deleteMessageTextReply);

module.exports = router;
