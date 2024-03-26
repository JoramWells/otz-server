const express = require('express');
const {
  addAppointment, getAllAppointments, getAppointment,
  editAppointment,
  deleteAppointment,
  getAppointmentDetail,
} = require('../controllers/appointment.controller');

const router = express.Router();

router.post('/add', addAppointment);
router.get('/fetchAll', getAllAppointments);
router.get('/detail/:id', getAppointmentDetail);
router.get('/appointmentDetail/:id', getAppointment);
router.put('/edit/:id', editAppointment);
router.delete('/delete/:id', deleteAppointment);

module.exports = router;
