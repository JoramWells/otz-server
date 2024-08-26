const express = require('express');
const { addUserLocations, getAllUserLocations, getUserLocation, getByPatientIDUserLocation, editUserLocation, deleteUserLocation } = require('../controllers/userLocationController');

const router = express.Router();

router.post('/add', addUserLocations);
router.get('/fetchAll', getAllUserLocations);
router.get('/detail/:id', getUserLocation);
router.get('/details/:id', getByPatientIDUserLocation);
router.put('/update/:id', editUserLocation);
router.delete('/delete/:id', deleteUserLocation);

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   if(editInternalLabRequest){
//     io.emit('lab-updated')
//   }
//   // You can handle events here if needed
// });

module.exports = router;