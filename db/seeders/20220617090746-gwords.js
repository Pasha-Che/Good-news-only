'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    const popularWords = [
      {
        goodword: 'дoкaзaтeльcтвo',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        goodword: 'бyдyщий',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        goodword: 'взгляд',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        goodword: 'биткоин',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        goodword: 'ставка',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        goodword: 'кола',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        goodword: 'союз',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        goodword: 'техника',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Gwords', popularWords);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gwords', null, {});
  },
};
