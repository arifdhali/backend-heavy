"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const BATCH_SIZE = 1000;

    const AUTHOR_START_ID = 1;
    const USER_START_ID = 10001;
    const USER_END_ID = 1000000;

    const SUBSCRIBER_DISTRIBUTION = [
      { authors: 5, subscribers: 10 },
      { authors: 5, subscribers: 100 },
      { authors: 5, subscribers: 1000 },
      { authors: 5, subscribers: 5000 },
      { authors: 5, subscribers: 10000 },
    ];

    const now = new Date();

    let currentUserId = USER_START_ID;
    let batch = [];
    let totalInserted = 0;
    let authorCounter = 0;
    for (const group of SUBSCRIBER_DISTRIBUTION) {

      for (let a = 0; a < group.authors; a++) {

        const author_id = AUTHOR_START_ID + totalInsertedAuthors();

        for (let i = 0; i < group.subscribers; i++) {

          if (currentUserId > USER_END_ID) {
            throw new Error("Not enough normal users available!");
          }

          batch.push({
            author_id,
            user_id: currentUserId++,
            subscribed_at: now,
            createdAt: now,
            updatedAt: now,
          });

          if (batch.length >= BATCH_SIZE) {

            await queryInterface.bulkInsert(
              "authors_subscribe",
              batch
            );

            totalInserted += batch.length;

            console.log(`Inserted subscriptions: ${totalInserted}`);

            batch = [];
          }
        }
      }
    }

    if (batch.length > 0) {
      await queryInterface.bulkInsert(
        "authors_subscribe",
        batch
      );

      totalInserted += batch.length;
    }

    console.log(`Total subscriptions generated: ${totalInserted}`);

    function totalInsertedAuthors() {
      return authorCounter++;
    }

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete(
      "authors_subscribe",
      {
        user_id: {
          [Sequelize.Op.between]: [10001, 90550],
        },
      }
    );

  },
};