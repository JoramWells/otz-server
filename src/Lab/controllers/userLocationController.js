/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const Patient = require('../models/patient/patients.models');
const UserLocation = require('../models/location/userLocation.model');

// setup server
const app = express();
const server = http.createServer(app);

// setup io
const io = socketIO(server);

// // check connection
// io.on('connection', (socket)=>{
//   console.log('Connected to IO sever')
// })
// using *Patients model
const addUserLocations = async (req, res, next) => {
    try {
        const newProfile = await UserLocation.create(req.body);

        res.json(newProfile);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get all priceListItems
const getAllUserLocations = async (req, res, next) => {
    try {
        const results = await UserLocation.findAll({
            include: [
                {
                    model: Patient,
                    attributes: ['firstName', 'middleName'],
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

const getUserLocation = async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await UserLocation.findOne({
            where: {
                id,
            },
            // order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Patient,
                    attributes: ['firstName', 'middleName'],
                },
            ],
        });
        res.json(results);
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ message: 'Internal Server Error' });
    }
};

//
const getByPatientIDUserLocation = async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await UserLocation.findOne({
            where: {
                patientID: id,
            },
            // order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Patient,
                    attributes: ['firstName', 'middleName'],
                },
            ],
        });
        res.json(results);
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ message: 'Internal Server Error' });
    }
};

// edit patient
const editUserLocation = async (req, res, next) => {
    const { id } = req.params;
    try {
        const labResults = await UserLocation.findOne({
            where: {
                id,
            },
        });

        labResults.results = req.body.results;
        labResults.save();
        req.app.locals.io.emit('lab-updated', labResults);

        res.status(200).json(labResults);
        next();
        return true;
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ message: 'Internal Server' });
        next(error);
    }
};

const deleteUserLocation = async (req, res, next) => {
    const { id } = req.params;
    try {
        const results = await UserLocation.destroy({
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
    addUserLocations,
    getAllUserLocations,
    getUserLocation,
    editUserLocation,
    deleteUserLocation,
    getByPatientIDUserLocation,
};