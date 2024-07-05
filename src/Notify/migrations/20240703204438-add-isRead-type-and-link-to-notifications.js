'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('patientNotifications','isRead',{
      type:Sequelize.BOOLEAN,
      defaultValue: false
    })

    await queryInterface.addColumn('patientNotifications','link',{
      type:Sequelize.STRING
    })

    await queryInterface.addColumn('patientNotifications','type',{
      type: Sequelize.STRING
    })
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('patientNotifications', 'isRead')
    await queryInterface.removeColumn('patientNotifications', 'link')
    await queryInterface.removeColumn('patientNotifications','type')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
