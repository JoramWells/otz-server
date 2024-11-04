'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'hospitalID', {
      type: Sequelize.UUID,
      // allowNull: false, // Allow NULL values
      // unique: true,
      references: {
        model: 'hospitals', // Name of the target table
        key: 'id', // Key in the target table
      },
      // onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // If the user is deleted, set hospitalID to NULL
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'hospitalID');
  }
};
