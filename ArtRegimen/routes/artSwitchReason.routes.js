const express = require('express');

const { addArtSwitchReason, getAllArtSwitchReasons, 
  getArtSwitchReason, editArtSwitchReason, deleteArtSwitchReason } = require('../controllers/artSwitchReason.model');

const router = express.Router();

router.post('/add', addArtSwitchReason);
router.get('/fetchAll', getAllArtSwitchReasons);
router.get('/detail/:id', getArtSwitchReason);
router.put('/edit/:id', editArtSwitchReason);
router.delete('/delete/:id', deleteArtSwitchReason);

module.exports = router;
