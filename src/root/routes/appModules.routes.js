const express = require('express');
const {
  addAppModules, getAllAppModules, getAppModulesDetail, deleteAppModules,
  editAppModules,
} = require('../controllers/appModules.controller');
const upload = require('../middleware/uploadImage');

const router = express.Router();

router.post('/add', upload.single('file'), addAppModules);
router.get('/fetchAll', getAllAppModules);
router.get('/detail/:id', getAppModulesDetail);
router.put('/edit/:id', upload.single('file'), editAppModules);
router.delete('/delete/:id', deleteAppModules);

module.exports = router;
