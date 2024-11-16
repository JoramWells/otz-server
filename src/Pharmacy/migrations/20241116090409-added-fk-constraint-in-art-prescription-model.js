'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // const followUpForeignKeys = await queryInterface.getForeignKeyReferencesForTable('artPrescriptions')

    // const existingPIDConstraint = followUpForeignKeys.find(fk => fk.columnName === 'patientVisitID')

    // if (existingPIDConstraint) {
    //   await queryInterface.removeConstraint('artPrescriptions', existingPIDConstraint.constraintName)
    // }

    await queryInterface.addColumn('artPrescriptions', 'patientVisitID',{
      type: Sequelize.UUID,
      references: {
        model: 'patientVisits',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      // allowNull: false,
      // defaultValue:'00710164-b99f-4bcf-8720-2717c9d6d569'
    })


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // await queryInterface.removeColumn('artPrescriptions', 'patientVisitID')
  }
};
