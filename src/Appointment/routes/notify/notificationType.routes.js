const express = require('express');
const {
  addNotificationType, getAllNotificationType,
  getNotificationType, editNotificationType, deleteNotificationType,
} = require('../../controllers/notifications/notificationType.controller');

const router = express.Router();

router.post('/add', addNotificationType);
router.get('/fetchAll', getAllNotificationType);
router.get('/detail/:id', getNotificationType);
router.put('/edit/:id', editNotificationType);
router.delete('/delete/:id', deleteNotificationType);

module.exports = router;
