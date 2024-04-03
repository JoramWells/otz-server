/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('timeAndWork', {
      fields: ['patientID'],
      type: 'foreign key',
      name: 'FK_patientID',
      references: {
        table: 'patients',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('timeAndWork', 'FK_patientID');
  },
};
