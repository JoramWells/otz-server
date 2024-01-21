/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const User = require('../../Users/models/user.models');
const HomeVisit_reason = require('../models/reasonDetails.model');

// using *Patients model
const addHomeVisitReason = async (req, res, next) => {
  try {
    const newProfile = await HomeVisit_reason.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// get all priceListItems
const getAllHomeVisitReasons = async (req, res, next) => {
  try {
    const results = await HomeVisit_reason.findAll();
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({error: 'Internal Server error'});
    next(error);
  }
};


const getHomeVisitReasonDetail = async (req, res, next) => {
  const {id} = req.params;
  try {
    const patient = await User.findOne({
      where: {
        user_id: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({message: 'Internal Server Error'});
  }
};

// edit patient
const editHomeVisitReason = async (req, res, next) => {
  const {id} = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const results = await Patient.findOne({
      where: {
        patient_id: id,
      },
    });

    results.first_name = first_name;
    results.middle_name = middle_name;
    results.last_name = last_name;
    results.id_number = id_number;
    results.cell_phone = cell_phone;
    next();

    return results.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({message: 'Internal Server'});
  }
};

const deleteHomeVisitReason = async (req, res, next) => {
  const {id} = req.params;
  try {
    const results = await Patient.destroy({
      where: {
        patient_id: id,
      },
    });

    if (results) {
      return res.status(200).json({message: 'User deleted successfully'});
    }
    return res.status(404).json({message: 'User not found.'});
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = {
  addHomeVisitReason, getAllHomeVisitReasons,
  getHomeVisitReasonDetail, editHomeVisitReason, deleteHomeVisitReason,
};
