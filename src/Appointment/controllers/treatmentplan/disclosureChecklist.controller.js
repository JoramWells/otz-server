/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const DisclosureChecklist = require('../../models/treatmentplan/disclosureChecklist.model.js');

// using *DisclosureChecklists model
const addDisclosureChecklist = async (req, res, next) => {
  try {
    const newProfile = await DisclosureChecklist.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllDisclosureChecklists = async (req, res, next) => {
  try {
    const results = await DisclosureChecklist.findAll();
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getDisclosureChecklist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await DisclosureChecklist.findOne({
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

// edit DisclosureChecklist
const editDisclosureChecklist = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const results = await DisclosureChecklist.findOne({
      where: {
        id,
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

const deleteDisclosureChecklist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await DisclosureChecklist.destroy({
      where: {
        id,
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
  addDisclosureChecklist,
  getAllDisclosureChecklists,
  getDisclosureChecklist,
  editDisclosureChecklist,
  deleteDisclosureChecklist,
};
