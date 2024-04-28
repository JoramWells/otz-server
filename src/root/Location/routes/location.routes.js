const express = require('express');
const {
  addLocation, getAllLocations, getLocationDetail, editLocation, deleteLocation,
} = require('../controllers/location.controller');

const router = express.Router();

router.post('/add', addLocation);
router.get('/fetchAll', getAllLocations);
router.get('/detail/:id', getLocationDetail);
router.put('/edit/:id', editLocation);
router.delete('/delete/:id', deleteLocation);

module.exports = router;
