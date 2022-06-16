const path = require("path");
require("dotenv").config();

const someEntries = require(path.join(process.env.PWD, "entriesSeed.js"));

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Entries", await someEntries());
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Entries", null, {});
  },
};
