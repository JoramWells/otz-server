'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */

async function generateDefaultHashedPassword(){
  const password = '12345678';
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds)
  console.log(passwordHash, 'as')
  return passwordHash
}

// console.log(generateDefaultHashedPassword())

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('patients', 'password',{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: await generateDefaultHashedPassword()

    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('patients', 'password')
  }
};
