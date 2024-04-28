/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const MessageTextReply = require('../../models/notify/messageTextReply.model');

// using *Patients model
const addMessageTextReply = async (req, res, next) => {
  try {
    const results = await MessageTextReply.create(req.body);

    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllMessageTextReply = async (req, res, next) => {
  try {
    const results = await MessageTextReply.findAll({ });
    res.json(results);
    next();
  } catch (error) {
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getMessageTextReply = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await MessageTextReply.findOne({
      where: {
        id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editMessageTextReply = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await MessageTextReply.findOne({
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
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteMessageTextReply = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await MessageTextReply.destroy({
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
  addMessageTextReply,
  getAllMessageTextReply,
  getMessageTextReply,
  editMessageTextReply,
  deleteMessageTextReply,
};
