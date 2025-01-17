/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { scheduleJob } from 'node-schedule';
import { createClient }  from 'redis';
import moment from 'moment'
import {logger} from './logger'

import EventEmitter from 'events'
import { Patient } from '../domain/models/patients.models';
import { MessageTextReply } from '../domain/models/notify/messageTextReply.model';
import { PatientNotification } from '../domain/models/notify/patientNotifications.model';
import { sendSMS } from './sendSMS';
import { User } from '../domain/models/user.model';
import { TimeAndWork } from '../domain/models/treatmentplan/timeAndWork.model';
import { Uptake } from '../domain/models/treatmentplan/uptake.model';


const notificationEmitter = new EventEmitter();
    type TimeWorkUptake = Uptake & {
      TimeAndWork: {
        morningMedicineTime: string;
        eveningMedicineTime: string;
        Patient: {
          id: string;
        };
      };
    };

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

  const currentDate = moment().format('YYYY-MM-DD');
  const currentHour = moment().hours();

  const isMorning = currentHour >= 5 && currentHour <= 12;
  const isEvening = currentHour >= 18 && currentHour <= 23;


  try {
    // const messages = await fetchMessages();
    // console.log(messages);


  const findUser = await User.findOne({});


    const patients = await Uptake.findAll({
      where: {
        currentDate,
      },
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: TimeAndWork,
          as: "TimeAndWork",
          attributes: ["id", "morningMedicineTime", "eveningMedicineTime"],
          include: [
            {
              model: Patient,
              attributes: ["id", "firstName", "middleName"],
            },
          ],
        },
      ],
    }) as TimeWorkUptake[] ;
    const messages = await fetchMessages();

    if (isMorning) {
    patients.forEach(async (patient) => {
      const morningMedicineTime = patient.TimeAndWork?.morningMedicineTime;
      if (morningMedicineTime) {
        const notificationTime = moment(morningMedicineTime, 'HH:mm:ss');
        // console.log(notificationTime, 'ft');

        const currentTime = moment();
        const timeDifference = notificationTime.diff(currentTime);
        if (timeDifference > 0 && findUser) {
          // console.log(notificationTime.toDate(), 'ft');

          scheduleJob(notificationTime.toDate(), async () => {
            const randomMessage =
              messages[Math.floor(Math.random() * messages.length)].messageText;

            await PatientNotification.create({
              patientID: patient.TimeAndWork.Patient.id,
              message: randomMessage,
              medicineTime: morningMedicineTime,
              type:'Medicine',
              userID:findUser.id
            });

            sendSMS(randomMessage);

            console.log(
              "Notification created for patient:",
              patient.TimeAndWork.Patient.id
            );
            logger.info({
              message: `Morning Notification created for patient:, ${patient.TimeAndWork.Patient.id}`,
            });
          });
        }
      }
    });
    }
    // else if (isEvening) {
    patients.forEach(async (patient) => {
      // const messages = await fetchMessages();

      const eveningMedicineTime = patient?.TimeAndWork?.eveningMedicineTime;
      if (eveningMedicineTime) {
        const notificationTime = moment(eveningMedicineTime, 'HH:mm:ss');
        // console.log(notificationTime, 'ft');

        const currentTime = moment();
        const timeDifference = notificationTime.diff(currentTime);
        if (timeDifference > 0 && findUser?.id) {
          // console.log(notificationTime.toDate(), 'ft');

          scheduleJob(notificationTime.toDate(), async () => {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)].messageText;

            // ceck if patient exists

            await PatientNotification.create({
              patientID: patient.TimeAndWork.Patient.id as string,
              message: randomMessage as string,
              medicineTime: eveningMedicineTime as string,
              type:'Medicine',
              userID:findUser.id
            });
            sendSMS(randomMessage)
            notificationEmitter.emit('notificationCreated', patient.TimeAndWork.Patient.id);           
             logger.info({
               message: `Morning Notification created for patient:, ${patient.TimeAndWork.Patient.id}`,
             });
            logger.info({
              message: `Morning Notification created for patient:, ${patient.TimeAndWork.Patient.id}`,
            });

          });
        }
      }
    });
    // }
  } catch (error) {
    console.error('Error scheduling patient notifications:', error);
  }
};

export {
  schedulePatientNotifications,
  notificationEmitter,
};
