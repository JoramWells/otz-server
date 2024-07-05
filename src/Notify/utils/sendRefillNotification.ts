import { Op, col, fn, literal } from "sequelize"
import { Prescription } from "../domain/models/art/prescription.model"
import { PatientNotification } from "../domain/models/notify/patientNotifications.model"
import { User } from "../domain/models/user.model";
import moment from "moment";

export async function sendRefillNotification(){
    const currentDate = new Date().toISOString().split('T')[0]
    const findUser = await User.findOne({});
    // const refillLevel = 

    const isNotified = await PatientNotification.findOne({
      where: {
        [Op.and]: [
          literal(`date_trunc('day', "createdAt") ='${currentDate}'`),
          {type: "Refill"},
        ],
      },
    });


    if(isNotified){
        console.log('Refill Notification created!!!')
    }else{
        console.log('Creating notification')
            const results = await Prescription.findAll({
              // get latest prescriptions
              attributes: [
                [fn("MAX", col("createdAt")), "createdAt"],
                "patientID",
              ],
              where: literal(`"expectedNoOfPills" < "noOfPills"/5 `),
              group: ["patientID"],
            });
          const needCompleteRefill = await Prescription.findAll({
            where: {
              [Op.or]: [{ expectedNoOfPills: 0 }, { expectedNoOfPills: null }],
            } as any,
          });

          // console.log(results)

          if (results) {
            results.forEach(async (prescription) => {
              await PatientNotification.create({
                patientID: prescription.patientID,
                message:
                  "Hello dear, your medicine is almost over. Kindly consider a refill",
                medicineTime: "00:00",
                type: "Refill",
                userID: findUser?.id,
              });
            });
          }

          if (needCompleteRefill) {
            needCompleteRefill.forEach(async (refill) => {
              await PatientNotification.create({
                patientID: refill.patientID,
                message:
                  "Hello dear, your medicine is over. Please visit our nearest facility for a refill.",
                medicineTime: "00:00",
                type: "Refill",
                userID: findUser?.id,
              });
            });
          }
    }

  
}