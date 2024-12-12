'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('appointmentStatus', 'status',{
      type: Sequelize.ENUM,
      values:['upcoming', 'pending', 'missed', 'cancelled', 'rescheduled'],
      defaultValue:'upcoming',
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('appointmentStatus', 'status')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
