const express = require('express');
const {addArtRegimen, getAllArtRegimen,
  getArtRegimen,
  editArtRegimen,
  deleteArtRegimen} = require('../controllers/artRegimen.controller');


const router = express.Router();

router.post('/add', addArtRegimen);
router.get('/fetchAll', getAllArtRegimen);
router.get('/detail/:id', getArtRegimen);
router.put('/edit/:id', editArtRegimen);
router.delete('/delete/:id', deleteArtRegimen);

module.exports = router;
