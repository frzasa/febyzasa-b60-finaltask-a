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
   return queryInterface.bulkInsert('users', [
  {
    email: 'rhaenyra@gmail.com',
    username: 'rhaenyra',
    password: '1234',
    createdAt: new Date(),
    postedAt: new Date(),
    updatedAt: new Date()
   
  },
  {
    email: 'daenerys@gmail.com',
    username: 'daenerys',
    password: '4321',
    createdAt: new Date(),
    postedAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'aegon@gmail.com',
    username: 'aegon',
    password: '4321',
    createdAt: new Date(),
    postedAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'daemon@gmail.com',
    username: 'daemon',
    password: '1234',
    createdAt: new Date(),
    postedAt: new Date(),
    updatedAt: new Date()
  },
  ])},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
