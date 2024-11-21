import { col, fn, Op, Sequelize } from "sequelize";
import { TimeAndWork } from "../domain/models/adherence/timeAndWork.model";
import { Adherence } from "../domain/models/adherence/adherence.model";
import { Prescription } from "../domain/models/art/prescription.model";
import moment from "moment";
import { connect } from "../domain/db/connect";

const adherenceMonitor2 = async () => {
  try {
    const currentDate = moment().format("YYYY-MM-DD");
    // const transaction = await connect.transaction()
    const latestTimeSchedule = await TimeAndWork.findAll({
      attributes: [
        [fn("MAX", col("createdAt")), "createdAt"],
        "patientID",
        "id",
      ],
      group: ["patientID", "id"],
      where: {
        updatedAt: {
          [Op.not]: null,
        } as any,
      },
    });

    //
    //
    const latestPrescriptions = await Prescription.findAll({
      attributes: [[fn("MAX", col("createdAt")), "createdAt"], "patientID"],
      group: ["patientID"],
    });

    for (const schedule of latestTimeSchedule) {
      const { patientID, createdAt, id } = schedule.dataValues;

      // const currentDate = createdAt?.toISOString().split("T")[0];
      const isSet: Adherence | null = await Adherence.findOne({
        where: {
          currentDate,
          timeAndWorkID: id,
        },
      });

      const latestPrescription = latestPrescriptions.find(
        (p) => p.dataValues.patientID === patientID
      );

      //
      // latestPrescriptions.find(p=>{console.log(p.dataValues.patientID, patientID)})
      // console.log(latestPrescription, patientID,'poilo')

      //
      if (!latestPrescription) {
        continue;
      }

      //
      const date = new Date(
        latestPrescription.dataValues.createdAt as unknown as string
      );

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

      if (!isSet) {
        if (schedule.dataValues.id && prescription?.id) {
          await Adherence.create({
            timeAndWorkID: schedule.dataValues.id,
            prescriptionID: prescription?.id,
            currentDate: currentDate as unknown as Date,
            morningStatus: false,
            eveningStatus: false,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export { adherenceMonitor2 };
