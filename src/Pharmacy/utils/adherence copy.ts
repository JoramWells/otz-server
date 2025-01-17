/* eslint-disable consistent-return */
import { TimeAndWork } from '../domain/models/adherence/timeAndWork.model'
import { Adherence} from '../domain/models/adherence/adherence.model'
import moment from 'moment'
import { Prescription } from '../domain/models/art/prescription.model'
import { Op, Sequelize, col, fn } from 'sequelize'
import { AdherenceAttributes, AdherenceByPatientAttributes, PrescriptionInterface } from "otz-types";
import {scheduleJob} from 'node-schedule'
import { logger } from './logger'

const updatePills = async() =>{
  const currentDate = moment().format("YYYY-MM-DD");
  // const isSet: Adherence | null = await Prescription.findOne({
  //   where: {
  //     updatedAt
  //   }
  // })

try {
    const results = await Prescription.findAll({
      attributes: [
        "id", // Assuming 'id' is the primary key of the prescription
        "patientID",
        "frequency",
        "refillDate",
        [
          // Calculate the expected number of pills, allowing for negative values
          Sequelize.literal(
            `(DATE_PART('day', NOW()::timestamp - "refillDate"::timestamp) * "frequency")`
          ),
          "expectedNoOfPills",
        ],
        "createdAt",
      ],
      where: {
        createdAt: {
          [Op.not]: null,
        },
        patientVisitID: {
          [Op.not]: null,
        },
      } as any,
    });


        for (const result of results) {
      const { id, expectedNoOfPills } = result.get();

      // Update the expected number of pills in the database
      await Prescription.update(
        { expectedNoOfPills },
        { where: { id } }
      );
    }

    console.log('Daily update of expected number of pills completed.');

} catch (error) {
  console.log(error)
}
}

const adherenceMonitor = async () => {
  try {
    const currentDate = moment().format('YYYY-MM-DD')
    // const isSet: Adherence | null = await Adherence.findOne({
    //   where: {
    //     currentDate
    //   }
    // })

    // if (isSet) {
    //   console.log('Uptake Data Is Set!!')

      // const allAdherence = await Adherence.findAll({
      //   where: {
      //     currentDate
      //   }
      // })

      // //
      // const latestTimeSchedule = await TimeAndWork.findAll({
      //   attributes: [
      //     [fn('MAX', col('createdAt')), 'createdAt'],
      //     'patientID'
      //   ],
      //   group: ['patientID'],
      //   where: {
      //     // patientVisitID: {
      //     //   [Op.not]: null
      //     // },
      //     updatedAt: {
      //       [Op.not]: null
      //     }
      //   }
      // })

      //
      // const latestPrescriptions = await Prescription.findOne({
      //   attributes: [
      //     'id',
      //     [fn('MAX', col('createdAt')), 'createdAt'],
      //     'patientID'
      //   ],
      //   group: ['patientID', 'id'],
      //   where: {
      //     patientVisitID: {
      //       [Op.not]: null
      //     },
      //     createdAt: {
      //       [Op.not]: null
      //     }
      //   }
      // })

      // console.log(latestPrescriptions)
    // } else {

      // get latest time for each patient
      const latestTimeSchedule = await TimeAndWork.findAll({
        attributes: [[fn('MAX', col('createdAt')), 'createdAt'], 'patientID', 'morningMedicineTime', 'eveningMedicineTime'],
        group: ['patientID', 'morningMedicineTime', 'eveningMedicineTime'],
        where: {
          // patientVisitID: {
          //   [Op.not]: null
          // },
          updatedAt: {
            [Op.not]: null
          } as any
        }
      })

      //
      const latestPrescriptions = await Prescription.findAll({
        attributes: [[fn('MAX', col('createdAt')), 'createdAt'], 'patientID'],
        group: ['patientID'],
        where: {
          patientVisitID: {
            [Op.not]: null
          } ,
          createdAt: {
            [Op.not]: null
          },
          // expectedNoOfPills: {
          //   [Op.gt]: 0
          // }  
        } as any
      })

      // console.log(latestPrescriptions)

      const adherenceResults: AdherenceAttributes[] = []

      for (const latestTIme of latestTimeSchedule) {
        const { patientID } = latestTIme;
        const timeAndWork = await TimeAndWork.findOne({
          where: {
            patientID,
            createdAt: latestTIme.dataValues.createdAt,
            // patientVisitID: {
            //   [Op.not]: null
            // }
          },
        });

        const latestPrescription = latestPrescriptions.find(
          (p) => p.patientID === patientID
        );
        if (!latestPrescription) {
          continue;
        }

        //
        const prescription: Prescription | null = await Prescription.findOne({
          where: {
            patientID,
            createdAt: latestPrescription.dataValues.createdAt,
          },
        });

        const morningMedicineDate = moment(
          `${currentDate} ${latestTIme.dataValues.morningMedicineTime}`,
          "YYYY-MM-DD HH:mm"
        );

        const eveningMedicineDate = moment(
          `${currentDate} ${latestTIme.dataValues.morningMedicineTime}`,
          "YYYY-MM-DD HH:mm"
        );

        
        // console.log(morningMedicineDate.format(), "morningDate");
        // Before pushing to array, add each patient to adherence, get time and work id
        if(prescription?.id){
            const isSet: Adherence | null = await Adherence.findOne({
              where: {
                currentDate,
                prescriptionID: prescription?.id,
              },
            });

            if(isSet){
              console.log(1)
            }else{
              scheduleJob(morningMedicineDate.format(), async () => {
                await Adherence.create({
                  timeAndWorkID: timeAndWork?.id,
                  prescriptionID: prescription?.id,
                  currentDate: currentDate as unknown as Date,
                  morningStatus: false,
                  eveningStatus: false,
                });
                logger.info({message:`Created new uptake for ${prescription} prescription!!`})
              });
              //
                // scheduleJob(eveningMedicineDate.format(), async () => {
                //   await Adherence.create({
                //     timeAndWorkID: timeAndWork?.id,
                //     prescriptionID: prescription?.id,
                //     currentDate: currentDate as unknown as Date,
                //     morningStatus: false,
                //     eveningStatus: false,
                //   });
                // });
            }

            // console.log(isSet?.dataValues, "set!!");
        }

        // if(!isSet){

        // }



        // adherenceResults.push({
        //   timeAndWorkID: timeAndWork?.id,
        //   prescriptionID: prescription?.id,
        //   currentDate:currentDate as unknown as Date,
        //   morningStatus: false,
        //   eveningStatus: false
        // })
        // console.log(prescription, 'presx')
      }

      // const uptakeData: AdherenceAttributes[] = adherenceResults.map((patient: any) => ({
      //   timeAndWorkID: patient.id,
      //   prescriptionID: patient.Patient.Prescription.id,
      //   currentDate,
      //   morningStatus: false,
      //   eveningStatus: false
      // }))
      // await Adherence.bulkCreate(adherenceResults)
      console.log('Uptake entries created for all patients.')
    // }
  } catch (error) {
    console.log(error)
  }
}

const calculatePatientAdherence = async () => {
  const prescriptions = await Prescription.findAll({
    where: {
      createdAt: {
        [Op.not]: null
      } ,
      patientID: {
        [Op.not]: null
      }
    } as any
  })

  const adherenceByPatient: AdherenceByPatientAttributes = {}
  prescriptions.forEach(prescription => {
    if (!adherenceByPatient[prescription.patientID]) {
      adherenceByPatient[prescription.patientID] = {
        totalQuantityPrescribed: 0,
        totalQuantityDispensed: 0
      }
    }
    
    adherenceByPatient[prescription.patientID].totalQuantityPrescribed += prescription.noOfPills as any
    adherenceByPatient[prescription.patientID].totalQuantityDispensed += prescription.computedNoOfPills as any
  })

  const adherenceData = Object.keys(adherenceByPatient).map(patientID => {
    const data: any = adherenceByPatient[patientID]
    
    const adherence = (data.totalQuantityDispensed / data.totalQuantityPrescribed) * 100
    return {
      patientID,
      adherence: adherence.toFixed(2)
    }
  })

  return adherenceData
}

// const calculateWeeklyAdherence = (data: string[]) => {
//   const completedChecks = data.reduce((sum, day))
// }

const calculateFacilityAdherence = async () => {
  const adherenceData = await calculatePatientAdherence()
  if (adherenceData.length === 0) {
    return 0
  }
  const totalAdherence = adherenceData.reduce((sum, patient) => sum + parseFloat(patient.adherence), 0)
  const averageAdherence = totalAdherence / adherenceData.length
  return averageAdherence.toFixed(2)
}

// const calculateAdherence = (uptakeEntries) => {
//   total_days
// }

export { adherenceMonitor, calculatePatientAdherence, calculateFacilityAdherence, updatePills }
