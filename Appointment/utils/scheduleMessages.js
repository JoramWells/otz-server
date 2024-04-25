/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const moment = require('moment-timezone');
const { scheduleJob } = require('node-schedule');
const { createClient } = require('redis');
const TimeAndWork = require('../models/treatmentplan/timeAndWork.model');
const Uptake = require('../models/treatmentplan/uptake.model');
const PatientNotification = require('../models/notify/patientNotifications.model');
const Patient = require('../models/patient/patients.models');
const MessageTextReply = require('../models/notify/messageTextReply.model');

const fetchMessages = async () => {
  try {
    // const redisClient = createClient({ url: 'redis://redis:6379' });
    // await redisClient.connect();

    // if (await redisClient.get('messageTextData') === null) {
    const messages = await MessageTextReply.findAll();
    // await redisClient.set('messageTextData', JSON.stringify(messages));
    // console.log('Fetching from cache...');
    return messages;
    // }
    // const cachedTextMessage = await redisClient.get('messageTextData');
    // return JSON.parse(cachedTextMessage);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

const schedulePatientNotifications = async () => {
  // const currentDate = moment();

  const currentDate = moment().tz('Africa/Nairobi').format('YYYY-MM-DD');
  const currentHour = moment().hours();

  const isMorning = currentHour >= 5 && currentHour <= 12;
  const isEvening = currentHour >= 18 && currentHour <= 23;

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
    const messages = await fetchMessages();

    // if (isMorning) {
    // patients.forEach(async (patient) => {
    //   const morningMedicineTime = patient?.timeAndWork?.morningMedicineTime;
    //   if (morningMedicineTime) {
    //     const notificationTime = moment(morningMedicineTime, 'HH:mm:ss');
    //     // console.log(notificationTime, 'ft');

    //     const currentTime = moment();
    //     const timeDifference = notificationTime.diff(currentTime);
    //     if (timeDifference > 0) {
    //       // console.log(notificationTime.toDate(), 'ft');

    //       scheduleJob(notificationTime.toDate(), async () => {
    //         const randomMessage = messages[Math.floor(Math.random() * messages.length)].messageText;

    //         await PatientNotification.create({
    //           patientID: patient.timeAndWork.patient.id,
    //           message: randomMessage,
    //           medicineTime: morningMedicineTime,
    //         });
    //         console.log('Notification created for patient:', patient.timeAndWork.patient.id);
    //       });
    //     }
    //   }
    // });
    // }
    // else if (isEvening) {
    patients.forEach(async (patient) => {
      // const messages = await fetchMessages();

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

            // ceck if patient exists

            await PatientNotification.create({
              patientID: patient.timeAndWork.patient.id,
              message: randomMessage,
              medicineTime: eveningMedicineTime,
            });
            console.log('Notification created for patient:', patient.timeAndWork.patient.id);
          });
        }
      }
    });
    // }
  } catch (error) {
    console.error('Error scheduling patient notifications:', error);
  }
};

module.exports = schedulePatientNotifications;
