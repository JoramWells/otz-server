/* eslint-disable consistent-return */
import { TimeAndWork } from '../domain/models/adherence/timeAndWork.model'
import { Adherence, type AdherenceAttributes } from '../domain/models/adherence/adherence.model'
import moment from 'moment'
import { Patient } from '../domain/models/patients.models'
import { Prescription } from '../domain/models/art/prescription.model'
import { Op, col, fn } from 'sequelize'

const adherenceMonitor = async () => {
  try {
    const currentDate = moment().format('YYYY-MM-DD')
    const isSet: Adherence | null = await Adherence.findOne({
      where: {
        currentDate
      }
    })

    if (isSet != null) {
      console.log('Uptake Data Is Set!!')
    } else {
      const latestTimeSchedule = await TimeAndWork.findAll({
        attributes: [[fn('MAX', col('createdAt')), 'createdAt'], 'patientID'],
        group: ['patientID'],
        where: {
          // patientVisitID: {
          //   [Op.not]: null
          // },
          updatedAt: {
            [Op.not]: null
          }
        }
      })
      console.log(latestTimeSchedule)

      //
      const latestPrescriptions = await Prescription.findAll({
        attributes: [[fn('MAX', col('createdAt')), 'createdAt'], 'patientID'],
        group: ['patientID'],
        where: {
          patientVisitID: {
            [Op.not]: null
          },
          createdAt: {
            [Op.not]: null
          }
        }
      })

      const adherenceResults: AdherenceAttributes[] = []

      for (const latestTIme of latestTimeSchedule) {
        // console.log(latestTIme.dataValues)
        const { patientID } = latestTIme
        const timeAndWork = await TimeAndWork.findOne({
          where: {
            patientID,
            createdAt: latestTIme.dataValues.createdAt
            // patientVisitID: {
            //   [Op.not]: null
            // }
          }
        })

        const latestPrescription = latestPrescriptions.find(p => p.patientID === patientID)
        if (!latestPrescription) {
          continue
        }

        //
        const prescription = await Prescription.findOne({
          where: {
            patientID,
            createdAt: latestPrescription.dataValues.createdAt
          }
        })

        adherenceResults.push({
          timeAndWorkID: timeAndWork.id,
          prescriptionID: prescription.id,
          currentDate,
          morningStatus: false,
          eveningStatus: false
        })
        // console.log(prescription, 'presx')
      }

      // const uptakeData: AdherenceAttributes[] = adherenceResults.map((patient: any) => ({
      //   timeAndWorkID: patient.id,
      //   prescriptionID: patient.Patient.Prescription.id,
      //   currentDate,
      //   morningStatus: false,
      //   eveningStatus: false
      // }))
      await Adherence.bulkCreate(adherenceResults)
      console.log('Uptake entries created for all patients.')
    }
  } catch (error) {
    console.log(error)
  }

  const adherenceRate = () => {
    const noOfPills = 30
    const calculatedExpectedValues = 0
    const noOfDaysTaken = 4
  }
}

// const calculateAdherence = (uptakeEntries) => {
//   total_days
// }

export { adherenceMonitor }
