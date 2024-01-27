const express = require('express');
const {addAppointmentStatus, getAllAppointmentStatus, getAppointmentStatus,
  editAppointmentStatus, deleteAppointmentStatus,
} = require('../controllers/appointment.controller copy');

const router = express.Router();

router.post('/add', addAppointmentStatus);
router.get('/fetchAll', getAllAppointmentStatus);
router.get('/detail/:id', getAppointmentStatus);
router.put('/edit/:id', editAppointmentStatus);
router.delete('/delete/:id', deleteAppointmentStatus);

module.exports = router;
