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

    const foreignKeys = await queryInterface.getForeignKeyReferencesForTable('timeAndWork')
    const foreignKeysUptake = await queryInterface.getForeignKeyReferencesForTable('uptake')

    const existingPIDConstraint = foreignKeys.find(fk => fk.columnName === 'patientID')
    const existingPVIDConstraint = foreignKeys.find(fk => fk.columnName === 'patientVisitID')
    const existingTWIDConstraint = foreignKeysUptake.find(fk => fk.columnName === 'timeAndWorkID')

    if(existingPIDConstraint){
      await queryInterface.removeConstraint('timeAndWork', existingPIDConstraint.constraintName)
    }

    // 
    if (existingPVIDConstraint) {
      await queryInterface.removeConstraint('timeAndWork', existingPVIDConstraint.constraintName)
    }

    // 
    if (existingTWIDConstraint) {
      await queryInterface.removeConstraint('uptake', existingPVIDConstraint.constraintName)
    }

    // 
    await queryInterface.addConstraint('timeAndWork',{
      fields:['patientID'],
      type: 'foreign key',
      name:'fk_patient_cascade',
      references:{
        table: 'patients',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    })

    // 
    await queryInterface.addConstraint('timeAndWork', {
      fields: ['patientVisitID'],
      type: 'foreign key',
      name: 'fk_patient_visit_cascade',
      references: {
        table: 'patientVisits',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false

    })

    // 
    await queryInterface.addConstraint('uptake', {
      fields: ['timeAndWorkID'],
      type: 'foreign key',
      name: 'fk_time_and_work_cascade',
      references: {
        table: 'timeAndWork',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false

    })

    // 
    await queryInterface.addConstraint('uptake', {
      fields: ['prescriptionID'],
      type: 'foreign key',
      name: 'fk_prescription_cascade',
      references: {
        table: 'prescriptions',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false

    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('timeAndWork', 'fk_patient_cascade')
    await queryInterface.removeConstraint('timeAndWork', 'fk_patient_visit_cascade')

    // 
    await queryInterface.removeConstraint('uptake', 'fk_time_and_work_cascade')
    await queryInterface.removeConstraint('uptake', 'fk_prescription_cascade')

    // 
    await queryInterface.addConstraint('timeAndWork', {
      fields: ['patientID'],
      type: 'foreign key',
      references: {
        table: 'patients',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

    // 
    await queryInterface.addConstraint('timeAndWork', {
      fields: ['patientVisitID'],
      type: 'foreign key',
      references: {
        table: 'patientVisits',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

    // 
    await queryInterface.addConstraint('upatke', {
      fields: ['timeAndWorkID'],
      type: 'foreign key',
      references: {
        table: 'timeAndWork',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

    // 
    // 
    await queryInterface.addConstraint('uptake', {
      fields: ['prescriptionID'],
      type: 'foreign key',
      references: {
        table: 'prescriptions',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

  }
};
