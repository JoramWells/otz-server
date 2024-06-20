'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('appointments', 'rescheduledDate',{
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('appointments','rescheduledReason',{
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('appointments','rescheduledDate')
    await queryInterface.removeColumn('appointments', 'rescheduledReason')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
