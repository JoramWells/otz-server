const express = require('express');
const {
  addNotification, getAllNotifications, getNotification, editNotification, deleteNotification,
} = require('../../controllers/notifications/notification.controller');

const router = express.Router();

router.post('/add', addNotification);
router.get('/fetchAll', getAllNotifications);
router.get('/detail/:id', getNotification);
router.put('/edit/:id', editNotification);
router.delete('/delete/:id', deleteNotification);

module.exports = router;
