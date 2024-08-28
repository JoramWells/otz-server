/* eslint-disable consistent-return */
import { TimeAndWork } from "../domain/models/adherence/timeAndWork.model";
import { Adherence } from "../domain/models/adherence/adherence.model";
import moment from "moment";
import { Prescription } from "../domain/models/art/prescription.model";
import { Op, Sequelize, col, fn } from "sequelize";
import {
  AdherenceAttributes,
  AdherenceByPatientAttributes,
  PrescriptionInterface,
} from "otz-types";
const adherenceMonitor = async () => {
  try {
    const currentDate = moment().format("YYYY-MM-DD");
    const isSet: Adherence | null = await Adherence.findOne({
      where: {
        currentDate,
      },
    });
    

    if (isSet != null) {
      console.log("Uptake Data Is Set!!");

    } else {
      const latestTimeSchedule = await TimeAndWork.findAll({
        attributes: [[fn("MAX", col("createdAt")), "createdAt"], "patientID"],
        group: ["patientID"],
        where: {
          // patientVisitID: {
          //   [Op.not]: null
          // },
          updatedAt: {
            [Op.not]: null,
          } as any,
        },
      });
      // console.log(latestTimeSchedule, 'lte schedule');

    
      
      //
      const latestPrescriptions = await Prescription.findAll({
        attributes: [[fn("MAX", col("createdAt")), "createdAt"], "patientID"],
        group: ["patientID"],
        // where: {
        //   patientVisitID: {
        //     [Op.not]: null,
        //   },
          // createdAt: {
          //   [Op.not]: null,
          // },
          // expectedNoOfPills: {
          //   [Op.gt]: 0,
          // },
        // } as any,
      });

      const adherenceResults: AdherenceAttributes[] = [];

      for (const latestTIme of latestTimeSchedule) {
        // console.log(latestTIme.dataValues)
        const { patientID } = latestTIme;
        const timeAndWork = await TimeAndWork.findOne({
          where: {
            patientID,
            // createdAt: latestTIme.dataValues.createdAt,
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
          const date = new Date(latestPrescription.dataValues.createdAt as unknown as string);

          // Format the date to 'YYYY-MM-DD HH:MM'
          const formattedDate = date
            .toISOString()
            .replace("T", " ")
            .substring(0, 16);

  
        //
        const prescription: Prescription | null = await Prescription.findOne({
          where: {
            patientID,
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn(
                  "to_char",
                  Sequelize.col("createdAt"),
                  "YYYY-MM-DD HH24:MI"
                ),
                formattedDate
              ),
            ],
          },
        });


        if(timeAndWork?.id && prescription?.id){
          adherenceResults.push({
            timeAndWorkID: timeAndWork?.id,
            prescriptionID: prescription?.id,
            currentDate: currentDate as unknown as Date,
            morningStatus: false,
            eveningStatus: false,
          });
        }


      }

      // const uptakeData: AdherenceAttributes[] = adherenceResults.map((patient: any) => ({
      //   timeAndWorkID: patient.id,
      //   prescriptionID: patient.Patient.Prescription.id,
      //   currentDate,
      //   morningStatus: false,
      //   eveningStatus: false
      // }))
      await Adherence.bulkCreate(adherenceResults);
      console.log("Uptake entries created for all patients.");
    }
  } catch (error) {
    console.log(error);
  }
};

const calculatePatientAdherence = async () => {
  const prescriptions = await Prescription.findAll({
    where: {
      createdAt: {
        [Op.not]: null,
      },
      patientID: {
        [Op.not]: null,
      },
    } as any,
  });

  const adherenceByPatient: AdherenceByPatientAttributes = {};
  prescriptions.forEach((prescription) => {
    if (!adherenceByPatient[prescription.patientID]) {
      adherenceByPatient[prescription.patientID] = {
        totalQuantityPrescribed: 0,
        totalQuantityDispensed: 0,
      };
    }

    adherenceByPatient[prescription.patientID].totalQuantityPrescribed +=
      prescription.noOfPills as any;
    adherenceByPatient[prescription.patientID].totalQuantityDispensed +=
      prescription.computedNoOfPills as any;
  });

  const adherenceData = Object.keys(adherenceByPatient).map((patientID) => {
    const data: any = adherenceByPatient[patientID];

    const adherence =
      (data.totalQuantityDispensed / data.totalQuantityPrescribed) * 100;
    return {
      patientID,
      adherence: adherence.toFixed(2),
    };
  });

  return adherenceData;
};

// const calculateWeeklyAdherence = (data: string[]) => {
//   const completedChecks = data.reduce((sum, day))
// }

const calculateFacilityAdherence = async () => {
  const adherenceData = await calculatePatientAdherence();
  if (adherenceData.length === 0) {
    return 0;
  }
  const totalAdherence = adherenceData.reduce(
    (sum, patient) => sum + parseFloat(patient.adherence),
    0
  );
  const averageAdherence = totalAdherence / adherenceData.length;
  return averageAdherence.toFixed(2);
};

// const calculateAdherence = (uptakeEntries) => {
//   total_days
// }

export {
  adherenceMonitor,
  calculatePatientAdherence,
  calculateFacilityAdherence,
};
