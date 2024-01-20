const express = require('express');
const {addUser, getAllUsers, getUserDetail,
  editUser, deleteUser} = require('../controllers/patients.controller');


const router = express.Router();

router.post('/add', addUser);
router.get('/fetchAll', getAllUsers);
router.get('/detail/:id', getUserDetail);
router.put('/edit/:id', editUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
