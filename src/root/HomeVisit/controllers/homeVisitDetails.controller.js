/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const ART = require('../../ArtRegimen/models/art.model');
const Patient = require('../../models/patient/patients.models');
const User = require('../../Users/models/user.models');
const Home_visit_detail = require('../models/homeVisit.models');
const HomeVisitReason = require('../models/HomeVisitReason.model');
// using *Patients model
const addHomeVisit = async (req, res, next) => {
  try {
    const newProfile = await Home_visit_detail.create(req.body);

    res.json(newProfile);
    console.log(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllHomeVisits = async (req, res, next) => {
  try {
    const results = await Home_visit_detail.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName', 'lastName'],
        },
        {
          model: User,
          attributes: ['firstName', 'middleName', 'lastName'],
        },
        {
          model: HomeVisitReason,
          attributes: ['homeVisitReasonDescription'],
        },
      ],
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getHomeVisitDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Home_visit_detail.findAll({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ['firstName', 'middleName', 'lastName'],
        },
        {
          model: ART,
          attributes: ['artName'],
        },
      ],
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// edit patient
const editHomeVisit = async (req, res, next) => {
  const { id } = req.params;
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
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteHomeVisit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Home_visit_detail.destroy({
      where: {
        patient_id: id,
      },
    });

    if (results) {
      return res.status(200).json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addHomeVisit,
  getAllHomeVisits,
  getHomeVisitDetails,
  editHomeVisit,
  deleteHomeVisit,
};
