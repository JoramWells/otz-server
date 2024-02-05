const express = require('express');
const { addRegimenPrescription, getAllRegimenPrescription,
  getRegimenPrescription, editRegimenPrescription,
  deleteRegimenPrescription } = require('../controllers/addRegimenPrescription.controller');

const router = express.Router();

router.post('/add', addRegimenPrescription);
router.get('/fetchAll', getAllRegimenPrescription);
router.get('/detail/:id', getRegimenPrescription);
router.put('/edit/:id', editRegimenPrescription);
router.delete('/delete/:id', deleteRegimenPrescription);

module.exports = router;

