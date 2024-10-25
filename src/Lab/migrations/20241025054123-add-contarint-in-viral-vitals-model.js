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

    const followUpForeignKeys = await queryInterface.getForeignKeyReferencesForTable('vitalSigns')
    const followUpForeignKeysViralLoads = await queryInterface.getForeignKeyReferencesForTable('viralLoads')

    const existingPIDConstraint = followUpForeignKeys.find(fk => fk.columnName === 'patientID')
    const existingTWIDConstraint = followUpForeignKeysViralLoads.find(fk => fk.columnName === 'patientID')
    const existingFKPatientIDConstraint = followUpForeignKeysViralLoads.find(fk => fk.columnName === 'patientVisitID')

    if (existingPIDConstraint) {
      await queryInterface.removeConstraint('vitalSigns', existingPIDConstraint.constraintName)
    }

     // 
    if (existingTWIDConstraint) {
      await queryInterface.removeConstraint('viralLoads', existingTWIDConstraint.constraintName)
    }

    // 
    if (existingFKPatientIDConstraint) {
      await queryInterface.removeConstraint('viralLoads', existingFKPatientIDConstraint.constraintName)
    }


    // 
    await queryInterface.addConstraint('vitalSigns', {
      fields: ['patientID'],
      type: 'foreign key',
      name: 'fk_patient_cascade',
      references: {
        table: 'patients',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    })



    // 
    await queryInterface.addConstraint('viralLoads', {
      fields: ['userID'],
      type: 'foreign key',
      name: 'fk_follow_follow_up',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false

    })

    // 
    await queryInterface.addConstraint('viralLoads', {
      fields: ['patientID'],
      type: 'foreign key',
      name: 'fk_prescription_cascade',
      references: {
        table: 'patients',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false

    })

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('vitalSigns', 'fk_patient_cascade')
    
    // 
    await queryInterface.removeConstraint('viralLoads', 'fk_follow_follow_up')
    await queryInterface.removeConstraint('viralLoads', 'fk_prescription_cascade')

    // 
    await queryInterface.addConstraint('vitalSigns', {
      fields: ['patientID'],
      type: 'foreign key',
      references: {
        table: 'patients',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })



    // 
    await queryInterface.addConstraint('viralLoads', {
      fields: ['patientID'],
      type: 'foreign key',
      references: {
        table: 'patients',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

    // 
    // 
    await queryInterface.addConstraint('viralLoads', {
      fields: ['userID'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

  }
};
