/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { Op } = require('sequelize');
const School = require('../models/school.model');

// using *Patients model
const addSchool = async (req, res, next) => {
  try {
    const newProfile = await School.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllSchools = async (req, res, next) => {
  try {
    const results = await School.findAll({
      limit: 100,
      where: {
        level: 'ECD/PRE-PRIMARY SCHOOL',
      },
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getSchool = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await School.findOne({
      where: {
        cccno: id,
      },
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editSchool = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await School.findOne({
      where: {
        patient_id: id,
      },
    });

    editPAtient.first_name = first_name;
    editPAtient.middle_name = middle_name;
    editPAtient.last_name = last_name;
    editPAtient.id_number = id_number;
    editPAtient.cell_phone = cell_phone;
    next();

    return editPAtient.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteSchool = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await School.destroy({
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

const search = async (req, res, next) => {
  const { searchQuery } = req.query
  const results = await School.findAll({
    where: {
      [Op.or]: [
        {
          schoolName: {
            [Op.iLike]: `${searchQuery}%`
          }
        }
      ]
    }
  })
  console.log(results)
  return results
}


module.exports = {
  addSchool,
  getAllSchools,
  getSchool,
  editSchool,
  deleteSchool,
  search
};
