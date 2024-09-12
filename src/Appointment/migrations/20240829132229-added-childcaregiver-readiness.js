'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addConstraint('childCaregiverReadiness',{
      fields: ['patientID'],
      type:'foreign key',
      name: 'fk_childCaregiverReadiness_patientID', // custom constraint name
      references:{
        table:'patients',
        field:'id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    })

    // 
    await queryInterface.addConstraint('childCaregiverReadiness', {
      fields: ['patientVisitID'],
      type: 'foreign key',
      name: 'fk_childCaregiverReadiness_patientVisitID', // custom constraint name
      references: {
        table: 'patientVisits',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('childCaregiverReadiness', 'fk_childCaregiverReadiness_patientID')
    await queryInterface.removeConstraint('childCaregiverReadiness', 'fk_childCaregiverReadiness_patientVisitID')
  }
};
