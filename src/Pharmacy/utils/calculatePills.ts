import moment from 'moment'
import { Prescription } from '../domain/models/art/prescription.model'
import { Op, Sequelize, col, fn, literal } from 'sequelize'
import { Patient } from '../domain/models/patients.models'
import { ART } from '../domain/models/art/art.model'
import { PrescriptionInterface } from 'otz-types'
import { Uptake } from '../domain/models/treatmentplan/uptake.model'
import { Adherence } from '../domain/models/adherence/adherence.model'

const calculatePills = async () => {
  const currentDate = moment().format('YYYY-MM-DD')
  const arts = await Prescription.findAll({
    where: {
      updatedAtExpectedNoOfPills: currentDate
    }
  })
  if (arts.length !== 0) {
    console.log('Pills Update Today')
  } else {
    const results = await Prescription.findAll({})

    for (const art of results) {
      if (art.expectedNoOfPills > art.frequency) {
        art.expectedNoOfPills -= art.frequency
        await art.update({
          expectedNoOfPills: art.expectedNoOfPills,
          updatedAtExpectedNoOfPills: currentDate as unknown as Date
        })

      } else {
        console.log('No enough medicines')
      }
    }
  }
}

const calculatePills2 = async (): Promise<PrescriptionInterface[]> => {
  const currentDate = moment().format('YYYY-MM-DD')

    const latestPrescription = await Prescription.findAll({
      attributes: [
        //   'noOfPills',
        [fn("MAX", col("createdAt")), "latestCreatedAt"],
        "patientID",
      ],
      where: {
        patientVisitID: {
          [Op.not]: null,
        },
      } as any,

      group: [
        // "expectedNoOfPills",
        // 'computedNoOfPills',
        // "frequency",
        // 'refillDate',
        // 'nextRefillDate',
        "patientID",
        // 'Patient.id',
        // "noOfPills",
        // "Patient.id",
        // "Patient.firstName",
        // "Patient.middleName",
      ],
      raw: true,
    });

  // const prescriptions = await Prescription.findAll({
  //   where: {
  //     [Op.or]: latestUpdates.map(({ patientID, createdAt }) => ({
  //       patientID,
  //       createdAt
  //     }))
  //   },
  //   include: [
  //     {
  //       model: Patient,
  //       attributes: ['id', 'firstName', 'middleName']
  //     },
  //     // {
  //     //   model: ART,
  //     //   attributes: ['artName']
  //       // where: {
  //       //   artName: {
  //       //     [Op.not]: null
  //       //   }
  //       // }
  //     // }
  //   ]
  // })

  // 
      const prescriptions = await Prescription.findAll({
        where: {
          [Op.and]: [
            {
              patientID: {
                [Op.in]: latestPrescription.map(
                  (prescription) => prescription.patientID
                ),
              },
            },
            Sequelize.where(
              col("Prescription.createdAt"),
              Op.eq,
              Sequelize.literal(
                `(SELECT MAX("createdAt") FROM Prescriptions WHERE "patientID" = "Prescription"."patientID")`
              )
            ),
          ],
        },
        include: [
          {
            model: Patient,
            attributes: ["id", "firstName", "middleName", "isImportant"],
          },

          // {
          //   model: ART,
          //   attributes: ['artName']
          // where: {
          //   artName: {
          //     [Op.not]: null
          //   }
          // }
          // }
        ],
        attributes: [
          'id',
          "expectedNoOfPills",
          "computedNoOfPills",
          "frequency",
          "refillDate",
          "nextRefillDate",
          "patientID",
          // 'Patient.id',
          "noOfPills",
          // "Patient.id",
          // "Patient.firstName",
          // "Patient.middleName",
        ],
      });

    // console.log(prescriptions)

  const arr: PrescriptionInterface[] = []

  for (const art of prescriptions) {
    const refillDate = art.refillDate

    const expectedValue = moment(currentDate).diff(refillDate, 'days')

    const pillsTaken = art.frequency * expectedValue
  // console.log(expectedValue, pillsTaken,"Calcx");

    // if(art.noOfPills)
    const remainingPills = art.noOfPills - pillsTaken
    if (art.expectedNoOfPills === remainingPills) {
      
      arr.push({ ...art.dataValues, message: 'Patient Adhered', remainingPills } as any)
    } else {
      // console.log(art)
      await art.update({
        id: art.dataValues.id,
        expectedNoOfPills: remainingPills,
        updatedAtExpectedNoOfPills: currentDate as unknown as Date
      })
    }
  }
  return arr
}

async function calculateAdherenceRateTimeSeries() {
  // Fetch all prescriptions along with their related data
  const prescriptions = await Prescription.findAll({
    attributes: ["id", "noOfPills", "expectedNoOfPills"],
    raw: true,
  });

  // Create a map of prescription data for quick lookup
  const prescriptionMap = prescriptions.reduce((map, prescription) => {
    map[prescription.id] = prescription;
    return map;
  }, {});

  // Fetch all Uptake records grouped by currentDate and prescriptionID
  const uptakes = await Adherence.findAll({
    attributes: [
      "currentDate",
      "prescriptionID",
      [
        Sequelize.literal(
          'SUM(CASE WHEN "morningStatus" = true THEN 1 ELSE 0 END)'
        ),
        "morningCount",
      ],
      [
        Sequelize.literal(
          'SUM(CASE WHEN "morningStatus" = false THEN 1 ELSE 0 END)'
        ),
        "morningFalseCount",
      ],
      [
        Sequelize.literal(
          'SUM(CASE WHEN "eveningStatus" = true THEN 1 ELSE 0 END)'
        ),
        "eveningCount",
      ],
      [
        Sequelize.literal(
          'SUM(CASE WHEN "eveningStatus" = false THEN 1 ELSE 0 END)'
        ),
        "eveningFalseCount",
      ],
    ],
    group: ["currentDate", "prescriptionID"],
    raw: true,
  });

  console.log(uptakes, "uptakes");

  // Prepare a time series map to calculate total pills taken and expected per day
  const timeSeries = {};

  for (const uptake of uptakes) {
    const { currentDate, prescriptionID, morningCount, eveningCount } = uptake;

    // Get the prescription details from the map
    const prescription = prescriptionMap[prescriptionID];
    if (!prescription) continue;

    const { noOfPills, expectedNoOfPills } = prescription;

    // Initialize the date entry if not present
    if (!timeSeries[currentDate]) {
      timeSeries[currentDate] = {
        totalPillsTaken: 0,
        totalNoOfPills: 0,
        totalExpectedNoOfPills: 0,
      };
    }

    // Update the totals for the current date
    const dailyEntry = timeSeries[currentDate];
    dailyEntry.totalPillsTaken +=
      parseInt(morningCount, 10) + parseInt(eveningCount, 10);
    dailyEntry.totalNoOfPills += noOfPills;
    dailyEntry.totalExpectedNoOfPills += expectedNoOfPills;
  }

  // Calculate adherence rate for each day
  const adherenceRateTimeSeries = Object.keys(timeSeries).map((date) => {
    const { totalPillsTaken, totalNoOfPills, totalExpectedNoOfPills } =
      timeSeries[date];
    const denominator = totalNoOfPills - totalExpectedNoOfPills;
    const adherenceRate =
      denominator > 0 ? (totalPillsTaken / denominator) * 100 : 0;

    return {
      date,
      adherenceRate,
    };
  });

  return adherenceRateTimeSeries;
}

calculateAdherenceRateTimeSeries()
  .then((timeSeries) => {
    console.log("Adherence Rate Time Series:", timeSeries);
  })
  .catch((err) => {
    console.error("Error calculating adherence rate time series:", err);
  });


export { calculatePills, calculatePills2, calculateAdherenceRateTimeSeries };
