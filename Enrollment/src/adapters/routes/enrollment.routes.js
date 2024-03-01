const express = require('express');
const {
    addOTZEnrollment, getAllOTZEnrollment,
} = require('../controllers/otzEnrollment.controller');

import enrollmentController from '../controllers/otzEnrollmentController'

const router = express.Router();

router.post('/add', enrollmentController.createEnrollment);
router.get('/fetchAll', enrollmentController.getAllOTZEnrollment);

module.exports = router;
