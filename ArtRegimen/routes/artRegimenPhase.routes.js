const express = require('express');
const {addArtRegimenPhase, getAllArtRegimenPhases,
  getArtRegimenPhase,
  editArtRegimenPhase,
  deleteArtRegimenPhase} = require('../controllers/artRegimenPhase.controller');

const router = express.Router();

router.post('/add', addArtRegimenPhase);
router.get('/fetchAll', getAllArtRegimenPhases);
router.get('/detail/:id', getArtRegimenPhase);
router.put('/edit/:id', editArtRegimenPhase);
router.delete('/delete/:id', deleteArtRegimenPhase);

module.exports = router;
