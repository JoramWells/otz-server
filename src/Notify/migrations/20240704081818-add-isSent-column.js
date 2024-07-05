'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('patientNotifications', 'isSent',{
      type:Sequelize.BOOLEAN,
      defaultValue: false
    })
    await queryInterface.addColumn('patientNotifications', 'isSentDate',{
      type:Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('patientNotifications', 'isSent')
    await queryInterface.removeColumn('patientNotifications', 'isSentDate')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
