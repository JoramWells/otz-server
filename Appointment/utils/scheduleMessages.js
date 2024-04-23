/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const moment = require('moment');
const { scheduleJob } = require('node-schedule');
const TimeAndWork = require('../models/treatmentplan/timeAndWork.model');
const Uptake = require('../models/treatmentplan/uptake.model');
const PatientNotification = require('../models/notify/patientNotifications.model');
const Patient = require('../models/patient/patients.models');
const MessageTextReply = require('../models/notify/messageTextReply.model');

const fetchMessages = async () => {
  try {
    const messages = await MessageTextReply.findAll();
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

const schedulePatientNotifications = async () => {
  const currentDate = moment().format('YYYY-MM-DD');

  try {
    // const messages = await fetchMessages();
    // console.log(messages);

    const patients = await Uptake.findAll({
      where: {
        currentDate,
      },
      order: [['updatedAt', 'DESC']],
      include: {
        model: TimeAndWork,
        attributes: ['id', 'morningMedicineTime', 'eveningMedicineTime'],
        include: {
          model: Patient,
          attributes: ['id', 'firstName', 'middleName'],
        },
      },
    });

    patients.forEach(async (patient) => {
      const messages = await fetchMessages();

      const eveningMedicineTime = patient?.timeAndWork?.eveningMedicineTime;
      if (eveningMedicineTime) {
        const notificationTime = moment(eveningMedicineTime, 'HH:mm:ss');
        // console.log(notificationTime, 'ft');

        const currentTime = moment();
        const timeDifference = notificationTime.diff(currentTime);
        if (timeDifference > 0) {
          // console.log(notificationTime.toDate(), 'ft');

          scheduleJob(notificationTime.toDate(), async () => {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)].messageText;

            await PatientNotification.create({
              patientID: patient.timeAndWork.patient.id,
              message: randomMessage,
            });
            console.log('Notification created for patient:', patient.timeAndWork.patient.id);
          });
        }
      }
    });
  } catch (error) {
    console.error('Error scheduling patient notifications:', error);
  }
};

module.exports = schedulePatientNotifications;
