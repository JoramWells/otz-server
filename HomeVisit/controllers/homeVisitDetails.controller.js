/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const ART = require('../../ArtRegimen/models/artDetails.model');
const Patient = require('../../Patient/models/patients.models');
const User = require('../../Users/models/user.models');
const Home_visit_detail = require('../models/homeVisit.models');
const HomeVisitReason = require('../models/HomeVisitReason.model');
// using *Patients model
const addHomeVisit = async (req, res, next) => {
  try {
    const newProfile = await Home_visit_detail.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// get all priceListItems
const getAllHomeVisits = async (req, res, next) => {
  try {
    const results = await Home_visit_detail.findAll({
      include: [
        {
          model: Patient,
          attributes: ['first_name', 'middle_name', 'last_name'],
        },
        {
          model: User,
          attributes: ['first_name', 'middle_name', 'last_name'],
        },
        {
          model: HomeVisitReason,
          attributes: ['homeVisit_reason_description'],
        },
      ],
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({error: 'Internal Server error'});
    next(error);
  }
};


const getHomeVisitDetails = async (req, res, next) => {
  const {id} = req.params;
  try {
    const patient = await Home_visit_detail.findAll({
      where: {
        patient_id: id,
      },
      include: [
        {
          model: User,
          attributes: ['first_name', 'middle_name', 'last_name'],
        },
        {
          model: ART,
          attributes: ['art_desc'],
        },
        {
          model: HomeVisit_reason,
          attributes: ['homeVisit_reason_description'],
        },
      ],
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({message: 'Internal Server Error'});
  }
};

// edit patient
const editHomeVisit = async (req, res, next) => {
  const {id} = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const results = await Home_visit_detail.findOne({
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

const deleteHomeVisit = async (req, res, next) => {
  const {id} = req.params;
  try {
    const results = await Home_visit_detail.destroy({
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
  addHomeVisit, getAllHomeVisits,
  getHomeVisitDetails, editHomeVisit, deleteHomeVisit,
};