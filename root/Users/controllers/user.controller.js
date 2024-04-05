/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const User = require('../models/user.models');

// using *Patients model
const addUser = async (req, res, next) => {
  const {
    firstName, secondName, middleName, email, gender, phone_no, countyID, password,
  } = req.body;
  try {
    // hash password
    const hashSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hash(password, hashSalt);

    const newProfile = await User.create({
      firstName,
      secondName,
      middleName,
      email,
      gender,
      phone_no,
      countyID,
      password,
    });

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllUsers = async (req, res, next) => {
  try {
    const patients = await User.findAll();
    res.json(patients);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const login = async (req, res, next) => {
  // console.log(req.params);
  const { email, password } = req.body;
  try {
    const patient = await User.findOne({
      where: {
        email,
      },
    });
    if (patient) {
      if (password === patient.password) {
        res.json({
          id: patient.id,
          email: patient.email,
        });
      }
    } else {
      res.sendStatus(500).json({ json: 'No user' });
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

const getUserDetail = async (req, res, next) => {
  const { id } = req.params;
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
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editUser = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const results = await User.findOne({
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

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await User.destroy({
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
  addUser, getAllUsers, getUserDetail, editUser, deleteUser, login,
};
