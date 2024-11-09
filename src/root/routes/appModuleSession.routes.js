const express = require('express');
const {
  addAppModuleSession, getAllAppModuleSession, getAppModuleSessionDetail, deleteAppModuleSession,
} = require('../controllers/appModulesSession.controller');

const router = express.Router();

router.post('/add', addAppModuleSession);
router.get('/fetchAll', getAllAppModuleSession);
router.get('/detail/:id', getAppModuleSessionDetail);
// router.put('/edit/:id', editAppModules);
router.delete('/delete/:id', deleteAppModuleSession);

module.exports = router;
