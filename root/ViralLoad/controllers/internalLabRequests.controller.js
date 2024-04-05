/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')

const InternalLabRequest = require("../models/internalLabRequests,model");
const Patient = require("../../Location/models/patients.models")

// setup server
const app=express()
const server = http.createServer(app)

// setup io
const io = socketIO(server)


// // check connection
// io.on('connection', (socket)=>{
//   console.log('Connected to IO sever')
// })
// using *Patients model
const addInternalLabRequests = async (req, res, next) => {
  try {
    const newProfile = await InternalLabRequest.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllInternalLabRequests = async (req, res, next) => {
  try {
    const results = await InternalLabRequest.findAll({
      include:[
        {
          model:Patient,
          attributes:['firstName', 'middleName']
        }
      ]
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getInternalLabRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await InternalLabRequest.findOne({
      where: {
        id,
      },
      // order: [['createdAt', 'DESC']],
      include:[
        {
          model:Patient,
          attributes:['firstName', 'middleName']
        }
      ]
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editInternalLabRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const labResults = await InternalLabRequest.findOne({
      where: {
        id,
      },
    });

    labResults.results = req.body.results;
    labResults.save();
    req.app.locals.io.emit('lab-updated', labResults)

    res.status(200).json(labResults)
    next();
    return true

  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error)
  }
};

const deleteInternalLabRequest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await InternalLabRequest.destroy({
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
  addInternalLabRequests, getAllInternalLabRequests, getInternalLabRequest, editInternalLabRequest, deleteInternalLabRequest,
};
