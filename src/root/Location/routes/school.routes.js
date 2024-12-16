const express = require('express');

const { addSchool, getAllSchools, getSchool, editSchool, deleteSchool, search } = require('../controllers/school.controller');

const router = express.Router();

router.post('/add', addSchool);
router.get('/fetchAll', getAllSchools);
router.get('/detail/:id', getSchool);
router.put('/edit/:id', editSchool);
router.delete('/delete/:id', deleteSchool);
router.get('/search', search);

module.exports = router;
