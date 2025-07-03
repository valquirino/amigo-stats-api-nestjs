'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'permission', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'approved',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'permission');
  },
};

