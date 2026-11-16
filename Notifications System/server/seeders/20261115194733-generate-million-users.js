"use strict";

const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const TOTAL_USERS = 1_000_000;
    const TOTAL_AUTHORS = 10_000;
    const BATCH_SIZE = 5_000;

    const now = new Date();

    // Hash password only once
    const passwordHash = await bcrypt.hash("Admin1!", 12);

    for (let start = 1; start <= TOTAL_USERS; start += BATCH_SIZE) {
      const end = Math.min(start + BATCH_SIZE - 1, TOTAL_USERS);

      const users = [];

      for (let i = start; i <= end; i++) {
        users.push({
          name: `User_${i}`,
          email: `demoUser-${i}@example.com`,

          user_type: i <= TOTAL_AUTHORS ? "author" : "user",

          password: passwordHash,

          createdAt: now,
          updatedAt: now,
        });
      }

      await queryInterface.bulkInsert("users", users);

      console.log(`Inserted users: ${end}/${TOTAL_USERS}`);
    }

    console.log("1 million users generated successfully!");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users")
  },
};