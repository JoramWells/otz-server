const express = require('express');
const {
  addUserNotifications, getAllUserNotifications,
  editUserNotifications, getUserNotifications, deleteUserNotifications,
} = require('../../controllers/notifications/userNotifications.controller');

const router = express.Router();

router.post('/add', addUserNotifications);
router.get('/fetchAll', getAllUserNotifications);
router.put('/edit/:id', editUserNotifications);
router.get('/detail/:id', getUserNotifications);
router.delete('/delete/:id', deleteUserNotifications);

module.exports = router;
