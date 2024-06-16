'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Change the column 'dob' from STRING to DATE with explicit casting
      await queryInterface.addColumn('patients', 'dob_temp', {
        type: Sequelize.DATE,
        allowNull: true
      }, { transaction })

      // Copy and cast the data from the old 'dob' column to the new 'dob_temp' column
      await queryInterface.sequelize.query(`
        UPDATE "patients"
        SET "dob_temp" = to_timestamp("dob", 'YYYY-MM-DD')::timestamp with time zone;
      `, { transaction })

      // Remove the old 'dob' column
      await queryInterface.removeColumn('patients', 'dob', { transaction })

      // Rename the 'dob_temp' column to 'dob'
      await queryInterface.renameColumn('patients', 'dob_temp', 'dob', { transaction })
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Revert the changes if needed

      // Add the old 'dob' column back as STRING
      await queryInterface.addColumn('patients', 'dob_temp', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction })

      // Copy and cast the data from the current 'dob' column to the new 'dob_temp' column
      await queryInterface.sequelize.query(`
        UPDATE "patients"
        SET "dob_temp" = "dob"::text;
      `, { transaction })

      // Remove the 'dob' column
      await queryInterface.removeColumn('patients', 'dob', { transaction })

      // Rename the 'dob_temp' column back to 'dob'
      await queryInterface.renameColumn('patients', 'dob_temp', 'dob', { transaction })
    })
  }
}
