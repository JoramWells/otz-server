const express = require('express');


const {
  addInternalLabRequests, getAllInternalLabRequests, getInternalLabRequest,
  editInternalLabRequest, deleteInternalLabRequest,
} = require('../controllers/internalLabRequests.controller');



const router = express.Router();

router.post('/add', addInternalLabRequests);
router.get('/fetchAll', getAllInternalLabRequests);
router.get('/detail/:id', getInternalLabRequest);
router.put('/update/:id', editInternalLabRequest);
router.delete('/delete/:id', deleteInternalLabRequest);

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   if(editInternalLabRequest){
//     io.emit('lab-updated')
//   }
//   // You can handle events here if needed
// });

module.exports = router;
