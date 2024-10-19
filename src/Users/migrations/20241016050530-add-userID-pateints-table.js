'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('patients', 'userID', {
      type: Sequelize.UUID,
      allowNull: true, // Allow NULL values
      unique: true,
      references: {
        model: 'users', // Name of the target table
        key: 'id', // Key in the target table
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // If the user is deleted, set userID to NULL
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('patients', 'userID');
  }
};
