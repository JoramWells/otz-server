const express = require('express');
const {addAppointmentAgenda, getAllAppointmentAgenda,
  getAppointmentAgenda, editAppointmentAgenda, deleteAppointmentAgenda,
} = require('../controllers/appointmentAgenda.controller');

const router = express.Router();

router.post('/add', addAppointmentAgenda);
router.get('/fetchAll', getAllAppointmentAgenda);
router.get('/detail/:id', getAppointmentAgenda);
router.put('/edit/:id', editAppointmentAgenda);
router.delete('/delete/:id', deleteAppointmentAgenda);

module.exports = router;
