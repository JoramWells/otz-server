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
    await queryInterface.addColumn('messages', 'isSent', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    })
    await queryInterface.addColumn('messages', 'isRead', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('messages', 'isSent')
    await queryInterface.removeColumn('messages', 'isRead')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
