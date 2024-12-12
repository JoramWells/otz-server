'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('appointments','isStarred',{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('appointments', 'isStarred')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
