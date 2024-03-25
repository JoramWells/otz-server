const express = require('express');
const {
  addUser, getAllUsers, getUserDetail,
  editUser, deleteUser, login,
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/add', addUser);
router.get('/fetchAll', getAllUsers);
router.get('/detail/:id', getUserDetail);
router.post('/login', login);
router.put('/edit/:id', editUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
