'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the existing constraint
    await queryInterface.removeConstraint('childCaregiverReadiness', 'childCaregiverReadiness_patientID_fkey');

    // Add the constraint with ON DELETE CASCADE
    await queryInterface.addConstraint('childCaregiverReadiness', {
      fields: ['patientID'],
      type: 'foreign key',
      name: 'childCaregiverReadiness_patientID_fkey', // Custom constraint name
      references: {
        table: 'patients',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Reverse the operation: Remove the new constraint and add the old one back without CASCADE
    await queryInterface.removeConstraint('childCaregiverReadiness', 'childCaregiverReadiness_patientID_fkey');

    await queryInterface.addConstraint('childCaregiverReadiness', {
      fields: ['patientID'],
      type: 'foreign key',
      name: 'childCaregiverReadiness_patientID_fkey', // Custom constraint name
      references: {
        table: 'patients',
        field: 'id',
      },
      onDelete: 'NO ACTION', // Change this based on your requirement
      onUpdate: 'NO ACTION',
    });
  }
};
