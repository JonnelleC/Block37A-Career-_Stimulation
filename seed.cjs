const client = require("./client.cjs");
const { createBag } = require("./bags.cjs");
const { getAllBags } = require("./bags.cjs");
const { createReviewTable } = require("./reviews.cjs");
const { getAllReviews } = require("./reviews.cjs");

const dropTables = async () => {
    try{
        await client.query(`
            DROP TABLE IF EXISTS bags;
            DROP TABLE IF EXISTS sellers;
            DROP TABLE IF EXISTS reviews;
        
         `);
    } catch (err) {
        console.log(err);
    }
};
const createTables = async () => {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS bags (
   id SERIAL PRIMARY KEY,
   bagname VARCHAR(255),
   brand VARCHAR(100),
   releasedate INT,
   description TEXT,
   price Real
);
            `);
  } catch (err) {
    console.log(err);
  }
};

const sellerTable = async () => {
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS sellers (
                username VARCHAR(50) PRIMARY KEY,
                emailaddress VARCHAR(100) NOT NULL,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                accountnumber INT UNIQUE,
                password VARCHAR(20) NOT Null
            );
        `);
    console.log("Sellers table created successfully.");
  } catch (err) {
    console.error("Error creating Sellers table:", err);
  } finally {
  }
};

const syncAndSeed = async () => {
  try {
    await createTables();

    await createBag();
    await getAllBags();

    console.log("DISCONNECTED");
  } catch (err) {
    console.error("Error during sync and seed:", err);
  }
};

const seedData = async () => {
  await client.connect();
  await dropTables();
  await sellerTable();
  await createTables();
  await createBag('Chanel19', 'chanel', 2018, 'worked', 5000);
  await getAllBags();
  await createReviewTable();
  await syncAndSeed();
  await client.end();
};

seedData();
