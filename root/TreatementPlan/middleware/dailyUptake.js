/* eslint-disable consistent-return */
const moment = require('moment');
const Uptake = require('../models/uptake.model');
const TimeAndWork = require('../models/timeAndWork.model');

const dailyUptake = async () => {
  try {
    const currentDate = moment().format('YYYY-MM-DD');

    const isSet = await Uptake.findOne({
      where: {
        currentDate,
      },
    });
    if (isSet) {
      console.log('Data is set');
    } else {
      const results = await TimeAndWork.findAll({
      // include: [
      //   {
      //     model: TimeAndWork,
      //     attributes: ['id'],
      //   },
      // ],
      });

      results.forEach(async (patient) => {
        await Uptake.create({
          timeAndWorkID: patient.id,
          currentDate,
          morningStatus: false,
          eveningStatus: false,
        });
      });
      console.log('Uptake entries created for all patients.');
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = dailyUptake;
