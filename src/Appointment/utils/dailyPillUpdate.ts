/* eslint-disable consistent-return */
import moment from 'moment-timezone'
import { TimeAndWork } from '../domain/models/treatmentplan/timeAndWork.model';
import { Uptake, UptakeAttributes } from '../domain/models/treatmentplan/uptake.model';
import { UptakeEntity } from '../domain/entities/treatmentplan/UptakeEntity';

const dailyPillUpdate = async () => {
  try {
    const currentDate  = moment().format('YYYY-MM-DD');

    const isSet = await Uptake.findOne({
      where: {
        currentDate,
      },
    });
    if (isSet) {
      console.log('Uptake Data is set!!');
    } else {
      const results = await TimeAndWork.findAll({
      // include: [
      //   {
      //     model: TimeAndWork,
      //     attributes: ['id'],
      //   },
      // ],
      });

      const uptakeData:UptakeEntity[] = results.map((patient: any) => ({
        timeAndWorkID: patient.id,
        currentDate,
        morningStatus: false,
        eveningStatus: false,
      }));
      await Uptake.bulkCreate(uptakeData);
      console.log('Uptake entries created for all patients.');
    }
  } catch (error) {
    console.log(error);
  }
};
export { dailyPillUpdate};
