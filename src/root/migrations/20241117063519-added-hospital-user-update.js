'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('hospitals', 'latitude', {
      type: Sequelize.STRING,
      allowNull: true,
      // defaultValue:'00710164-b99f-4bcf-8720-2717c9d6d569'
    })

    await queryInterface.addColumn('hospitals', 'longitude', {
      type: Sequelize.STRING,
      allowNull: true,
      // defaultValue:'00710164-b99f-4bcf-8720-2717c9d6d569'
    })

    await queryInterface.addColumn('hospitals', 'locationUpdatedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      // defaultValue:'00710164-b99f-4bcf-8720-2717c9d6d569'
    })


    await queryInterface.addColumn('hospitals', 'locationUpdatedBy', {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      // allowNull: false,
      // defaultValue:'00710164-b99f-4bcf-8720-2717c9d6d569'
    })


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('hospitals', 'latitude')
    await queryInterface.removeColumn('hospitals', 'longitude')
    await queryInterface.removeColumn('hospitals', 'locationUpdatedAt')
    await queryInterface.removeColumn('hospitals', 'locationUpdatedBy')
  }
};
