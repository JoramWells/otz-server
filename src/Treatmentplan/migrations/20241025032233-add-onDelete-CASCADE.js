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

    const followUpForeignKeys = await queryInterface.getForeignKeyReferencesForTable('followUpChecklist')
    const followUpForeignKeysDisclosureChecklist = await queryInterface.getForeignKeyReferencesForTable('disclosureChecklist')

    const existingPIDConstraint = followUpForeignKeys.find(fk => fk.columnName === 'patientID')
    const existingPVIDConstraint = followUpForeignKeys.find(fk => fk.columnName === 'patientVisitID')
    const existingTWIDConstraint = followUpForeignKeysDisclosureChecklist.find(fk => fk.columnName === 'patientID')
    const existingFKPatientIDConstraint = followUpForeignKeysDisclosureChecklist.find(fk => fk.columnName === 'patientVisitID')

    if (existingPIDConstraint) {
      await queryInterface.removeConstraint('followUpChecklist', existingPIDConstraint.constraintName)
    }

    // 
    if (existingPVIDConstraint) {
      await queryInterface.removeConstraint('followUpChecklist', existingPVIDConstraint.constraintName)
    }

    // 
    if (existingTWIDConstraint) {
      await queryInterface.removeConstraint('disclosureChecklist', existingTWIDConstraint.constraintName)
    }

    // 
    if (existingFKPatientIDConstraint) {
      await queryInterface.removeConstraint('disclosureChecklist', existingFKPatientIDConstraint.constraintName)
    }


    // 
    await queryInterface.addConstraint('followUpChecklist', {
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
    await queryInterface.addConstraint('followUpChecklist', {
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
    await queryInterface.addConstraint('disclosureChecklist', {
      fields: ['patientVisitID'],
      type: 'foreign key',
      name: 'fk_follow_follow_up',
      references: {
        table: 'patientVisits',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false

    })

    // 
    await queryInterface.addConstraint('disclosureChecklist', {
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
    await queryInterface.removeConstraint('followUpChecklist', 'fk_patient_cascade')
    await queryInterface.removeConstraint('followUpChecklist', 'fk_patient_visit_cascade')

    // 
    await queryInterface.removeConstraint('disclosureChecklist', 'fk_follow_follow_up')
    await queryInterface.removeConstraint('disclosureChecklist', 'fk_prescription_cascade')

    // 
    await queryInterface.addConstraint('followUpChecklist', {
      fields: ['patientID'],
      type: 'foreign key',
      references: {
        table: 'patients',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

    // 
    await queryInterface.addConstraint('followUpChecklist', {
      fields: ['patientVisitID'],
      type: 'foreign key',
      references: {
        table: 'patientVisits',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

    // 
    await queryInterface.addConstraint('disclosureChecklist', {
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
    await queryInterface.addConstraint('disclosureChecklist', {
      fields: ['patientVisitID'],
      type: 'foreign key',
      references: {
        table: 'patientVisits',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

  }
};
