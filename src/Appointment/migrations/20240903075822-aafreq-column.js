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
    await queryInterface.addColumn('appointments', 'frequency',{
      type: Sequelize.ENUM('daily', 'weekly', 'bimonthly', 'monthly', 'once'),
      allowNull: true,
      // defaultValue:'daily'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('appointments', 'frequency',{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
  }
};
