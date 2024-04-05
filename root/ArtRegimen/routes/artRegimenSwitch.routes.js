const express = require('express');

const { addArtRegimenSwitch, getAllArtRegimenSwitch, getArtRegimenSwitch,
  editArtRegimenSwitch, deleteArtRegimenSwitch } = require('../controllers/artRegimenSwitch.controller');

const router = express.Router();

router.post('/add', addArtRegimenSwitch);
router.get('/fetchAll', getAllArtRegimenSwitch);
router.get('/detail/:id', getArtRegimenSwitch);
router.put('/edit/:id', editArtRegimenSwitch);
router.delete('/delete/:id', deleteArtRegimenSwitch);

module.exports = router;
