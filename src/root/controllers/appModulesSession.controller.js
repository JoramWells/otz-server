/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const {
  fn, col, Op, where, literal,
} = require('sequelize');
const AppModules = require('../models/appModules/appModules');
const AppModuleSession = require('../models/appModules/moduleSession');

// using *Patients model
const addAppModuleSession = async (req, res, next) => {
  try {
    const data = { ...req.body, img: req.file?.filename };
    const newProfile = await AppModuleSession.create(data);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllAppModuleSession = async (req, res, next) => {
  try {
    const results = await AppModuleSession.findAll({ });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getAppModuleSessionDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Get the latest session creation time per appModuleID
    const latestAppSession = await AppModuleSession.findAll({
      attributes: [
        [fn('MAX', col('createdAt')), 'latestCreatedAt'],
        'appModuleID',
      ],
      group: ['appModuleID'],
    });

    // Fetch all app module sessions based on the latest session creation time
    const results = await AppModuleSession.findAll({
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: AppModules,
          attributes: ['title', 'description', 'link', 'img', 'isActive'],
        },
      ],
      where: {
        [Op.and]: [
          {
            userID: id,
            appModuleID: {
              [Op.in]: latestAppSession.map((session) => session.appModuleID),
            },
          },
          {
            createdAt: {
              [Op.eq]: literal(`(
                SELECT MAX("createdAt") 
                FROM "appModuleSessions" AS innerSession 
                WHERE innerSession."appModuleID" = "appModuleSessions"."appModuleID"
              )`),
            },
          },
        ],
      },
    });

    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
// const editAppModules = async (req, res, next) => {
//   const { id } = req.params;
//   const {
//     AppModulesName, mflCode
//   } = req.body;
//   try {
//     const editPAtient = await AppModules.findOne({
//       where: {
//         id,
//       },
//     });

//     editPAtient.AppModulesName = AppModulesName;
//     editPAtient.mflCode = mflCode;
//     res.status(200).json(editPAtient)
//     next();

//     return editPAtient.save();
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500).json({ message: 'Internal Server' });
//   }
// };

const deleteAppModuleSession = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await AppModuleSession.destroy({
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
  addAppModuleSession, getAllAppModuleSession, getAppModuleSessionDetail, deleteAppModuleSession,
};
