const express = require('express');
const {
  addAppModules, getAllAppModules, getAppModulesDetail, deleteAppModules,
} = require('../controllers/appModules.controller');
const upload = require('../middleware/uploadImage');

const router = express.Router();

router.post('/add', upload.single('file'), addAppModules);
router.get('/fetchAll', getAllAppModules);
router.get('/detail/:id', getAppModulesDetail);
// router.put('/edit/:id', editAppModules);
router.delete('/delete/:id', deleteAppModules);

module.exports = router;
