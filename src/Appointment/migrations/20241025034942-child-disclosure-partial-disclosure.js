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

    const followUpForeignKeys = await queryInterface.getForeignKeyReferencesForTable('partialDisclosure')
    const followUpForeignKeyChildDisclosureEligibility = await queryInterface.getForeignKeyReferencesForTable('childDisclosureEligibility')

    const existingPIDConstraint = followUpForeignKeys.find(fk => fk.columnName === 'childDisclosureEligibilityID')
    const existingPVIDConstraint = followUpForeignKeys.find(fk => fk.columnName === 'childCaregiverReadinessID')
    const existingTWIDConstraint = followUpForeignKeyChildDisclosureEligibility.find(fk => fk.columnName === 'patientID')
    const existingFKPatientIDConstraint = followUpForeignKeyChildDisclosureEligibility.find(fk => fk.columnName === 'patientVisitID')

    if (existingPIDConstraint) {
      await queryInterface.removeConstraint('partialDisclosure', existingPIDConstraint.constraintName)
    }

    // 
    if (existingPVIDConstraint) {
      await queryInterface.removeConstraint('partialDisclosure', existingPVIDConstraint.constraintName)
    }

    // 
    if (existingTWIDConstraint) {
      await queryInterface.removeConstraint('childDisclosureEligibility', existingTWIDConstraint.constraintName)
    }

    // 
    if (existingFKPatientIDConstraint) {
      await queryInterface.removeConstraint('childDisclosureEligibility', existingTWIDConstraint.constraintName)
    }

    // 
    await queryInterface.addConstraint('partialDisclosure', {
      fields: ['childDisclosureEligibilityID'],
      type: 'foreign key',
      name: 'fk_childDisclosureEligibilityID_cascade',
      references: {
        table: 'childDisclosureEligibility',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    })

    // 
    await queryInterface.addConstraint('partialDisclosure', {
      fields: ['childCaregiverReadinessID'],
      type: 'foreign key',
      name: 'fk_childCaregiverReadiness_cascade',
      references: {
        table: 'childCaregiverReadiness',
        field: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false

    })

    // 
    await queryInterface.addConstraint('childDisclosureEligibility', {
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
    await queryInterface.addConstraint('childDisclosureEligibility', {
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
    await queryInterface.removeConstraint('partialDisclosure', 'fk_childDisclosureEligibilityID_cascade')
    await queryInterface.removeConstraint('partialDisclosure', 'fk_childCaregiverReadiness_cascade')

    // 
    await queryInterface.removeConstraint('childDisclosureEligibility', 'fk_follow_follow_up')
    await queryInterface.removeConstraint('childDisclosureEligibility', 'fk_prescription_cascade')

    // 
    await queryInterface.addConstraint('partialDisclosure', {
      fields: ['childCaregiverReadinessID'],
      type: 'foreign key',
      references: {
        table: 'childCaregiverReadiness',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

    // 
    await queryInterface.addConstraint('partialDisclosure', {
      fields: ['childDisclosureEligibilityID'],
      type: 'foreign key',
      references: {
        table: 'childDisclosureEligibility',
        field: 'id'
      },
      onDelete: 'NO ACTION'
    })

    // 
    await queryInterface.addConstraint('childDisclosureEligibility', {
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
    await queryInterface.addConstraint('childDisclosureEligibility', {
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
