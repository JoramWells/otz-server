/* eslint-disable consistent-return */
const moment = require('moment');
const Uptake = require('../models/uptake.model');
const TimeAndWork = require('../models/timeAndWork.model');

const dailyUptake = async (req, res, next) => {
  try {
    const currentDate = moment().format('YYYY-MM-DD');

    const isSet = await Uptake.findOne({
      where: {
        currentDate,
      },
    });
    if (isSet) {
      console.log('Data is set');
      return next();
    }
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
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = dailyUptake;
