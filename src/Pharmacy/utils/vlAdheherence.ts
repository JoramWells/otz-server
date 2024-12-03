import { col, fn, literal, Op, where } from "sequelize";
import { ViralLoad } from "../domain/models/lab/viralLoad.model";
import { Patient } from "../domain/models/patients.models";

export async function vlAdherence() {
  const currentDate = new Date();
  let maxDate = new Date(
    currentDate.getFullYear() - 25,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return await ViralLoad.findAll({
    include: [
      {
        model: Patient,
        attributes:[],
        where: {
          dob: { [Op.gte]: maxDate }, // Default filter
        },
      },
    ],
    attributes: [
        'Patient.hospitalID',
      [fn("COUNT", "*"), "count"],
      [
        fn(
          "SUM",
          literal(
            `CASE WHEN "isVLValid" = true AND "vlResults" < 50 THEN 1 ELSE 0 END`
          )
        ),
        "vlResultsCount",
      ],
      [
        literal(
          `
          ROUND (
          SUM(
          CASE WHEN "isVLValid" = true AND "vlResults" < 50 THEN 1 ELSE 0 END
          )::numeric / COUNT(*)
          ) * 100
          `
        ),
        "percentage",
      ],
    ],
    group:['Patient.hospitalID'],
    raw: true,
  });
}
