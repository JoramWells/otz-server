const express = require('express');
const {
  addNotificationCategory, getAllNotificationCategories, getNotificationCategory,
  editNotificationCategory, deleteNotificationCategory,
} = require('../../controllers/notifications/notificationCategory.controller');

const router = express.Router();

router.post('/add', addNotificationCategory);
router.get('/fetchAll', getAllNotificationCategories);
router.get('/detail/:id', getNotificationCategory);
router.put('/edit/:id', editNotificationCategory);
router.delete('/delete/:id', deleteNotificationCategory);

module.exports = router;
