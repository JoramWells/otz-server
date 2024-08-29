import moment from 'moment'
import { Prescription } from '../domain/models/art/prescription.model'
import { Op, Sequelize, col, fn } from 'sequelize'
import { Patient } from '../domain/models/patients.models'
import { ART } from '../domain/models/art/art.model'
import { PrescriptionInterface } from 'otz-types'

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
      console.log(
        remainingPills,
        "Expected no of pills",
        art.expectedNoOfPills
      );
      
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

export { calculatePills, calculatePills2 }
