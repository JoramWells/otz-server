/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const { Sequelize } = require('sequelize');
// const SchoolTermHoliday = require('../../Enrollment/src/domain/models/school/schoolTermHolidays.model');
const Patient = require('../models/patient/patients.models');
const ViralLoad = require('../models/lab/viralLoad.model');
const connect = require('../db/connect');
const Appointment = require('../models/appointment.model');
const KafkaAdapter = require('../kafka/producer/kafka.producer');

// using *Patients model
const addViralLoadTest = async (req, res, next) => {
  const {
    userID,
    patientID,
    patientVisitID,
    appointmentAgendaID,
    appointmentStatusID,
    appointmentDate,
    dateOfVL,
    dateOfNextVL,
    vlResults,
    vlJustification,
  } = req.body;

  try {
    const kafkaProducer = new KafkaAdapter();
     await connect.transaction(async (t) => {
      const results = await ViralLoad.create({
        userID,
        dateOfVL,
        dateOfNextVL,
        vlResults,
        vlJustification,
        patientVisitID,
        patientID,
      }, { transaction: t });
      if (results) {
        await Appointment.create({
          userID,
          patientID,
          patientVisitID,
          appointmentAgendaID,
          appointmentStatusID,
          appointmentDate,
        }, { transaction: t });
      }
      res.status(200).json(results)

    });

    //  kafka send message
    await kafkaProducer.sendMessage('complete', [{
      value: JSON.stringify({ patientID, agenda: 'viral load' }),
    }]);

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllViralLoad = async (req, res, next) => {
  const {hospitalID} = req.params
  if (!hospitalID || hospitalID === "undefined")
    return res.status(400).json({ message: "Invalid ID parameter" });
  try {
    const currentDate = new Date()
    const maxDate = new Date(
      currentDate.getFullYear() - 26,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const results = await ViralLoad.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName', 'dob', 'sex'],
          where: {
            dob: {
              [Op.gte]: maxDate
            }
          }
        },
        {
          model: User,
          where: {
            hospitalID
          }
        }
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

const getAllVlCategories = async (req, res, next) => {
  try {
    const results = await ViralLoad.findAll({
      attributes: [
        [Sequelize.literal(`CASE
      WHEN "vlResults"::numeric < 50 THEN 'LDL'
      WHEN "vlResults"::numeric BETWEEN 50 AND 199 THEN 'Low RiskLLV'
      WHEN "vlResults"::numeric BETWEEN 200 AND 999 THEN 'High Risk LLV'
      ELSE 'Suspected Treatment Failure'
      END`), 'category'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'count'],
      ],
      group: 'category',
    });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

// ceck next appointment
const calculateNextAppointmentDate = (appointmentDate, frequency) => {
  // Parse the frequency to determine the interval
  const [interval, unit] = frequency.split(' ');

  // Convert appointmentDate to milliseconds
  let nextAppointmentDate = new Date(appointmentDate).getTime();

  // Calculate the next appointment date based on the frequency
  switch (unit) {
    // Assuming 30 days per month
    case 'months':
      nextAppointmentDate += parseInt(interval, 10) * 30 * 24 * 60 * 60 * 1000;
      break;
    case 'weeks':
      nextAppointmentDate += parseInt(interval, 10) * 7 * 24 * 60 * 60 * 1000;
      break;
    case 'days':
      nextAppointmentDate += parseInt(interval, 10) * 24 * 60 * 60 * 1000;
      break;
    default:
      nextAppointmentDate += parseInt(interval, 10) * 24 * 60 * 60 * 1000;
    // Add more cases as needed
  }

  return new Date(nextAppointmentDate);
};

// ceck oliday
// const checkSchoolHoliday = async (date) => {
//   try {
//     // Fetch all holidays from the database
//     const holidays = await SchoolTermHoliday.findAll();

//     // Check if the date falls within any holiday period
//     for (const holiday of holidays) {
//       const holidayStartDate = new Date(holiday.start_date);
//       const holidayEndDate = new Date(holiday.end_date);

//       // Check if the date falls within the holiday period
//       if (date >= holidayStartDate && date <= holidayEndDate) {
//         return true; // Date falls within a holiday
//       }
//     }

//     return false; // Date does not fall within any holiday
//   } catch (error) {
//     console.error('Error checking school holiday:', error);
//     return false; // Return false in case of error
//   }
// };

// //
// const checkAppointment = async () => {
//   try {
//     const patients = await Patient.findAll();

//     //
//     for (const patient of patients) {
//       const vlDate = await ViralLoad.findOne({
//         where: { id: patient.id },
//       });

//       if (vlDate) {
//         const dueDate = new Date(vlDate.dateOfNextVL);
//         const calculatedDueDate = calaculatDueDate(dueDate, 6);
//         const isHoliday = checkSchoolHoliday(calculatedDueDate);

//         if (isHoliday) {
//           console.log('holiday');
//         } else {
//           console.log('not holiday');
//         }
//       } else {
//         console.log('No appointment scheduled');
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const getViralLoadTest = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id === "undefined")
    return res.status(400).json({ message: "Invalid ID parameter" });

  console.log(id);
  try {
    const patient = await ViralLoad.findOne({
      order: [['createdAt', 'DESC']],
      where: {
        patientID: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

//
const getAllViralLoadByPatientID = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id === "undefined")
    return res.status(400).json({ message: "Invalid ID parameter" });

  try {
    const patient = await ViralLoad.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        patientID: id,
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
const editViralLoadTest = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await ViralLoad.findOne({
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

const deleteViralLoadTest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await ViralLoad.destroy({
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
  addViralLoadTest,
  getAllViralLoad,
  getViralLoadTest,
  editViralLoadTest,
  deleteViralLoadTest,
  getAllVlCategories,
  getAllViralLoadByPatientID,
};
