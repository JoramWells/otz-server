import moment from 'moment'
import { Prescription } from '../domain/models/art/prescription.model'
import { Op, col, fn } from 'sequelize'
import { type PrescriptionEntity } from '../domain/entities/art/PrescriptionEntity'
import { Patient } from '../domain/models/patients.models'
import { ART } from '../domain/models/art/art.model'

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
          updatedAtExpectedNoOfPills: currentDate
        })

        console.log(
          'Updated prescription:',
          'Medication:',
          `Frequency: ${art.frequency}`,
          `Remaining pills: ${art.expectedNoOfPills}`
        )
      } else {
        console.log('No enough medicines')
      }
    }
  }
}

const calculatePills2 = async (): Promise<PrescriptionEntity[]> => {
  const currentDate = moment().format('YYYY-MM-DD')

  const results: PrescriptionEntity[] = await Prescription.findAll({
    attributes: [
      //   'noOfPills',
      [fn('MAX', col('createdAt')), 'createdAt'],
      'patientID'
    ],
    where: {
      createdAt: {
        [Op.not]: null
      }
      // drugID: {
      //   [Op.not]: null
      // }
    },
    group: ['patientID']
  })

  const latestUpdates = results.map((item: any) => {
    return {
      patientID: item.dataValues.patientID,
      createdAt: item.dataValues.createdAt
    }
  })

  const prescriptions = await Prescription.findAll({
    where: {
      [Op.or]: latestUpdates.map(({ patientID, createdAt }) => ({
        patientID,
        createdAt
      }))
    },
    include: [
      {
        model: Patient,
        attributes: ['id', 'firstName', 'middleName']
      },
      {
        model: ART,
        attributes: ['artName']
        // where: {
        //   artName: {
        //     [Op.not]: null
        //   }
        // }
      }
    ]
  })

  //   console.log(prescriptions)

  const arr: PrescriptionEntity[] = []

  for (const art of prescriptions) {
    const refillDate = art.refillDate
    const expectedValue = moment(currentDate).diff(refillDate, 'days')
    const pillsTaken = art.frequency * expectedValue
    // if(art.noOfPills)
    const remainingPills = art.noOfPills - pillsTaken
    if (art.expectedNoOfPills === remainingPills) {
      arr.push({ ...art.dataValues, message: 'Patient Adhered', remainingPills })
    } else {
      await art.update({
        expectedNoOfPills: remainingPills,
        updatedAtExpectedNoOfPills: currentDate
      })
    }
  }
  return arr
}

export { calculatePills, calculatePills2 }
