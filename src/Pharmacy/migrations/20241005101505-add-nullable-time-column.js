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
    await queryInterface.changeColumn('timeAndWork','morningMedicineTime',{
      type: Sequelize.TIME,
      allowNull: true,
    })

    // 
    await queryInterface.changeColumn('timeAndWork', 'eveningMedicineTime', {
      type: Sequelize.TIME,
      allowNull: true,
    })


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn('timeAndWork', 'morningMedicineTime', {
      type: Sequelize.TIME,
      allowNull: false,
    })

    // 
    await queryInterface.changeColumn('timeAndWork', 'eveningMedicineTime', {
      type: Sequelize.TIME,
      allowNull: false,
    })

    // 
  }
};
