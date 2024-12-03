import { QueryTypes } from "sequelize";
import { connect } from "../domain/db/connect";

export async function countCalHIV() {
  const results = await connect.query(
    `
        SELECT
            "hospitalID",
            COUNT (CASE WHEN EXTRACT (YEAR FROM AGE (dob)) BETWEEN 0 and 9 THEN 1 END) age_0_9,
            COUNT (CASE WHEN EXTRACT (YEAR FROM AGE (dob)) BETWEEN 10 and 14 THEN 1 END) age_10_14,
            COUNT (CASE WHEN EXTRACT (YEAR FROM AGE (dob)) BETWEEN 15 and 19 THEN 1 END) age_15_19,
           COUNT (CASE WHEN EXTRACT (YEAR FROM AGE (dob)) BETWEEN 20 and 24 THEN 1 END) age_20_24
           FROM patients
           GROUP BY "hospitalID";
        `,
    {
      type: QueryTypes.SELECT,
    }
  );
  console.log(results)
  return results
}
