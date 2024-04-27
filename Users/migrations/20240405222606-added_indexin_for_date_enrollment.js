'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create a new partitioned table
    await queryInterface.sequelize.query(`
      CREATE TABLE patients_new (
        -- Define your columns here
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        firstName VARCHAR(255),
        middleName VARCHAR(255),
        lastName VARCHAR(255),
        sex VARCHAR(10),
        dob DATE,
        phoneNo VARCHAR(20),
        occupationID UUID,
        idNo VARCHAR(20),
        cccNo VARCHAR(20),
        ageAtReporting DATE,
        "dateConfirmedPositive" DATE,
        initialRegimen VARCHAR(255),
        populationType VARCHAR(50),
        schoolID INTEGER,
        hospitalID INTEGER,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
        updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
      )
      PARTITION BY RANGE ("dateConfirmedPositive");
      
      -- Create partitions as needed
    `)

    // 2. Copy data from the old table to the new one
    await queryInterface.sequelize.query(`
      INSERT INTO patients_new
      SELECT * FROM patients;
    `)

    // 3. Drop the old table and rename the new one
    await queryInterface.sequelize.query(`
      DROP TABLE patients;
      ALTER TABLE patients_new RENAME TO patients;
    `)
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting the migration - drop the new table
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS patients;
    `)

    // You may need to recreate the old table and copy data back if needed
  }
}
