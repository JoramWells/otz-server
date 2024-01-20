const express = require('express');
const {addArtRegimenCategory,
  getAllArtRegimenCategories,
  getArtRegimenCategory,
  editArtRegimenCategory,
  deleteArtRegimenCategory,
} = require('../controllers/artRegimenCategory.controller');

const router = express.Router();

router.post('/add', addArtRegimenCategory);
router.get('/fetchAll', getAllArtRegimenCategories);
router.get('/detail/:id', getArtRegimenCategory);
router.put('/edit/:id', editArtRegimenCategory);
router.delete('/delete/:id', deleteArtRegimenCategory);

module.exports = router;
