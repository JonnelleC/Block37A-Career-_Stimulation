const client = require('./client.cjs');
const { createBag } = require ('./bags.cjs');



const createTables = async () => {

    try{
        await client.query(`
        CREATE TABLE Bags (
   BagSerialID INT PRIMARY KEY,
   BagName VARCHAR(255) NOT NULL,
   Brand VARCHAR(100) NOT NULL,
   ReleaseDate DATE,
   Description TEXT,
   Price DECIMAL(10, 2)
);
            `);
    } catch (err){
        console,log(err);
    }


}
const sellerTable = async () => {
    try {
        await client.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS sellers (
                Username VARCHAR(50) PRIMARY KEY,
                EmailAddress VARCHAR(100) NOT NULL,
                FirstName VARCHAR(50) NOT NULL,
                LastName VARCHAR(50) NOT NULL,
                AccountNumber INT UNIQUE
            );
        `);
        console.log('Sellers table created successfully.');
    } catch (err) {
        console.error('Error creating Sellers table:', err);
    } finally {
        await client.end();
    }
};

sellerTable();


const syncAndSeed = async () => {
    try {
        await client.connect();
        console.log('CONNECTED');

        await createTables();
        await createSellerTable();
        await seedData();

        await client.end();
        console.log('DISCONNECTED');
    } catch (err) {
        console.error('Error during sync and seed:', err);
        await client.end();
    }
};

syncAndSeed();