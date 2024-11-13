/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const AppModules = require('../models/appModules/appModules');

// using *Patients model
const addAppModules = async (req, res, next) => {
  try {
    const data = { ...req.body, img: req.file?.filename };
    const newProfile = await AppModules.create(data);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllAppModules = async (req, res, next) => {
  try {
    const results = await AppModules.findAll({ });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getAppModulesDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await AppModules.findOne({
      where: {
        id,
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
const editAppModules = async (req, res, next) => {
  const { id } = req.params;
  const img = req.file.filename;
  const {
    title, description, link,
  } = req.body;

  try {
    const results = await AppModules.findOne({
      where: {
        id,
      },
    });

    results.title = title;
    results.description = description;
    results.link = link;
    results.img = img;
    res.status(200).json(results);
    next();

    return results.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteAppModules = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await AppModules.destroy({
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
  addAppModules, getAllAppModules, getAppModulesDetail, deleteAppModules, editAppModules,
};
