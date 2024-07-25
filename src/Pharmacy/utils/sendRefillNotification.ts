import { Op, col, fn, literal } from "sequelize"
import { Prescription } from "../domain/models/art/prescription.model"
import { User } from "../domain/models/user.model";
import moment from "moment";
import { KafkaAdapter } from "../adapters/kafka/producer/kafka.producer";
import { PatientNotificationAttributes } from "otz-types";

export async function sendRefillNotification(){
  const kafkaProducer = new KafkaAdapter()
    const findUser = await User.findOne({});
    // const refillLevel = 
    

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

  const patientNotifications: PatientNotificationAttributes[] = []

  if (results) {
    results.forEach(async (prescription) => {
      if(prescription.patientID){
        patientNotifications.push({
          patientID: prescription.patientID,
          message:
            "Hello dear, your medicine is almost over. Kindly consider a refill",
          medicineTime: "00:00",
          type: "Refill",
          userID: findUser?.id,
        });
        // await PatientNotification.create({
        //   patientID: prescription.patientID,
        //   message:
        //     "Hello dear, your medicine is almost over. Kindly consider a refill",
        //   medicineTime: "00:00",
        //   type: "Refill",
        //   userID: findUser?.id,
        // });
      }

    });

    await kafkaProducer.sendMessage("refill", [
      { value: JSON.stringify(patientNotifications) },
    ]);



  }

  if (needCompleteRefill) {
    needCompleteRefill.forEach(async (refill) => {
      if(refill.patientID){
        patientNotifications.push({
          patientID: refill.patientID,
          message:
            "Hello dear, your medicine is over. Please visit our nearest facility for a refill.",
          medicineTime: "00:00",
          type: "Refill",
          userID: findUser?.id,
        });
        // await PatientNotification.create({
        //   patientID: refill.patientID,
        //   message:
        //     "Hello dear, your medicine is over. Please visit our nearest facility for a refill.",
        //   medicineTime: "00:00",
        //   type: "Refill",
        //   userID: findUser?.id,
        // });
      }
  
    });

    await kafkaProducer.sendMessage("refill", [
      { value: JSON.stringify(patientNotifications) },
    ]);
  }

  
}