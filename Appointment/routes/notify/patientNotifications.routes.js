const express = require('express');
const {
  addPatientNotifications, getAllPatientNotifications,
  editPatientNotifications, getPatientNotifications, deletePatientNotifications,
} = require('../../controllers/notifications/patientNotifications.controller');

const router = express.Router();

router.post('/add', addPatientNotifications);
router.get('/fetchAll', getAllPatientNotifications);
router.put('/edit/:id', editPatientNotifications);
router.get('/detail/:id', getPatientNotifications);
router.delete('/delete/:id', deletePatientNotifications);

module.exports = router;
