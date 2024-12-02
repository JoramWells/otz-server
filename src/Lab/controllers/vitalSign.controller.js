/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const PatientVisits = require('../models/patient/patientVisits.model');
const VitalSign = require('../models/vitalSigns.model');
const connect = require('../db/connect');
const Patient = require('../models/patient/patients.models');

// using *Patients model
const addVitalSign = async (req, res, next) => {
  try {
    const newProfile = await VitalSign.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllVitalSigns = async (req, res, next) => {
  try {
    const patients = await VitalSign.findAll({
      include:[
        {
          model: Patient,
          attributes:['firstName', 'middleName', 'avatar']
        }
      ],
      // raw: true
    });
    res.json(patients);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getVitalSignByPatientID = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id === "undefined")
    return res.status(400).json({ message: "Invalid ID parameter" });
  try {
    const patient = await VitalSign.findOne({
      order: [['updatedAt', 'DESC']],
      where: {
        patientID: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

const getAllVitalSignByPatientID = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id === "undefined")
    return res.status(400).json({ message: "Invalid ID parameter" });
  try {
    const patient = await VitalSign.findAll({
      order: [['updatedAt', 'DESC']],
      where: {
        patientID: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

const getVitalSignDetail = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id === "undefined")
    return res.status(400).json({ message: "Invalid ID parameter" });
  try {
    const patient = await VitalSign.findOne({
      where: {
        patientVisitID: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// 
const getVitalSignByVisitID = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id === "undefined")
    return res.status(400).json({ message: "Invalid ID parameter" });
  try {
    const patient = await VitalSign.findOne({
      where: {
        patientVisitID: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

//
const getAllVitalSignDetail = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id === "undefined")
    return res.status(400).json({ message: "Invalid ID parameter" });
  try {
    const patient = await VitalSign.findAll({
      where: {
        patientVisitID: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// edit patient
const editVitalSign = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await VitalSign.findOne({
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

const updateHeight = async (req, res, next) => {
  const { id } = req.params;
  const {
    height, patientID,
  } = req.body;
  try {
    //
    return await connect.transaction(async (t) => {
      const selfCareVisit = await PatientVisits.create({
        patientID,
        type: 'self care',
      }, { transaction: t });

      const results = await VitalSign.create({
        patientID: id,
        patientVisitID: selfCareVisit.id,
        height,

      }, { transaction: t });
      return results;
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};

// 
const updateWeight = async (req, res, next) => {
  const { id } = req.params;
  const currentDate = new Date()
  const typeOfVisit = 'self care'
  const {
    weight, patientID,
  } = req.body;
    try {

    //
    return await connect.transaction(async (t) => {

      // confirm if the patient has a visit today
      const isSelfCaredToday = await PatientVisits.findOne({
        patientID,
        type: typeOfVisit,
        createdAt: currentDate
      }, {transaction: t})

      if (isSelfCaredToday) {
        const todaysVitals = await VitalSign.findOne({
          patientVisitID: isSelfCaredToday.id
        })

        todaysVitals.weight = weight
        todaysVitals.save()
        return todaysVitals;

      } else {
        const selfCareVisit = await PatientVisits.create({
          patientID,
          type: 'self care',
        }, { transaction: t });

        const results = await VitalSign.create({
          patientID: id,
          patientVisitID: selfCareVisit.id,
          weight,

        }, { transaction: t });
        return results;
      }


    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};


// edit patient
const updateBMI = async (req, res, next) => {
  const { id } = req.params;
  const {
    weight, height, bmi, systolic, diastolic, patientID,
  } = req.body;
  try {
    //
    return await connect.transaction(async (t) => {
      const selfCareVisit = await PatientVisits.create({
        patientID,
        type: 'self care',
      }, { transaction: t });

      const results = await VitalSign.create({
        patientID: id,
        patientVisitID: selfCareVisit.id,
        weight,
        height,
        bmi,
        systolic,
        diastolic,

      }, { transaction: t });
      return results;
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};

const deleteVitalSign = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await VitalSign.destroy({
      where: {
        patient_id: id,
      },
    });

    if (results) {
      return res.json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addVitalSign,
  getAllVitalSigns,
  getVitalSignDetail,
  editVitalSign,
  deleteVitalSign,
  getVitalSignByPatientID,
  getAllVitalSignDetail,
  getAllVitalSignByPatientID,
  updateBMI,
  updateHeight,
  updateWeight,
  getVitalSignByVisitID
};
