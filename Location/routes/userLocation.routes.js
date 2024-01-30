const express = require('express');
const {
  addUserLocation, getAllUserLocations, getUserLocationDetail, editUserLocation, deleteUserLocation,
} = require('../controllers/userLocation.controller');

const router = express.Router();

router.post('/add', addUserLocation);
router.get('/fetchAll', getAllUserLocations);
router.get('/detail/:id', getUserLocationDetail);
router.put('/edit/:id', editUserLocation);
router.delete('/delete/:id', deleteUserLocation);

module.exports = router;
