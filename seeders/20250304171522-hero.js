'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('heros', [
    {
      name: "The Dragon Queen",
      type_id: 1,
      photo: "/4/assets/img/rhaenyraa.jpg",
      user_id: 1,
      createdAt: new Date(),
      postedAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "The Mother of Dragons",
      type_id: 2,
      photo: "/4/assets/img/daenerys.jpg",
      user_id: 2,
      createdAt: new Date(),
      postedAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "The Conqueror",
      type_id: 3,
      photo: "/4/assets/img/aegoni.jpg",
      user_id: 3,
      createdAt: new Date(),
      postedAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "The Rogue Prince",
      type_id: 1,
      photo: "/4/assets/img/daemon.jpg",
      user_id: 1,
      createdAt: new Date(),
      postedAt: new Date(),
      updatedAt: new Date()
    },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
