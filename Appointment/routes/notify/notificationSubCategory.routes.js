const express = require('express');
const {
  addNotificationSubCategory, getAllNotificationSubCategories,
  getNotificationSubCategory, editNotificationSubCategory, deleteNotificationSubCategory,
} = require('../../controllers/notifications/notificationSubCategory.controller');

const router = express.Router();

router.post('/add', addNotificationSubCategory);
router.get('/fetchAll', getAllNotificationSubCategories);
router.get('/detail/:id', getNotificationSubCategory);
router.put('/edit/:id', editNotificationSubCategory);
router.delete('/delete/:id', deleteNotificationSubCategory);

module.exports = router;
