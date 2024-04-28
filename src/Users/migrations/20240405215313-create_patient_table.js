'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patients', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      phoneNo: {
        type: Sequelize.STRING
      },
      occupationID: {
        type: Sequelize.UUID,
        allowNull: true
      },
      idNo: {
        type: Sequelize.STRING
      },
      cccNo: {
        type: Sequelize.STRING
      },
      ageAtReporting: {
        type: Sequelize.DATE
      },
      dateConfirmedPositive: {
        type: Sequelize.DATE
      },
      initialRegimen: {
        type: Sequelize.STRING,
        allowNull: true
      },
      populationType: {
        type: Sequelize.STRING
      },
      schoolID: {
        type: Sequelize.INTEGER
      },
      hospitalID: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()')
      }
    })

    // Add foreign key constraints
    await queryInterface.addConstraint('patients', {
      fields: ['schoolID'],
      type: 'foreign key',
      name: 'patients_school_fk',
      references: {
        table: 'schools', // Make sure to adjust the table name if necessary
        field: 'id'
      },
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('patients', {
      fields: ['hospitalID'],
      type: 'foreign key',
      name: 'patients_hospital_fk',
      references: {
        table: 'Hospital', // Make sure to adjust the table name if necessary
        field: 'id'
      },
      onDelete: 'CASCADE'
    })

    // Add index on frequently queried columns if necessary
    await queryInterface.addIndex('patients', ['firstName'])
    await queryInterface.addIndex('patients', ['lastName'])
    // Add more indexes as needed
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('patients')
  }
}
