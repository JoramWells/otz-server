const express = require('express');

const { addInternalLabRequests, getAllInternalLabRequests, getInternalLabRequest, 
  editInternalLabRequest, deleteInternalLabRequest } = require('../controllers/internalLabRequests.controller');

const router = express.Router();

router.post('/add', addInternalLabRequests);
router.get('/fetchAll', getAllInternalLabRequests);
router.get('/detail/:id', getInternalLabRequest);
router.put('/edit/:id', editInternalLabRequest);
router.delete('/delete/:id', deleteInternalLabRequest);

module.exports = router;
