const client = require('./client.cjs');
const { createBag } = require ('./bags.cjs');
const { getAllBags} = require ('./bags.cjs');
const { createReviewTable } = require ('./reviews.cjs');
const { getAllReviews } = require ('./reviews.cjs')
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
                username VARCHAR(50) PRIMARY KEY,
                emailaddress VARCHAR(100) NOT NULL,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                accountnumber INT UNIQUE,
                password VARCHAR(20) NOT Null
            );
        `);
        console.log('Sellers table created successfully.');
    } catch (err) {
        console.error('Error creating Sellers table:', err);
    } finally {
        await client.end();
    }
};




const syncAndSeed = async () => {
    try {
        await client.connect();
        console.log('CONNECTED');

        await createTables();
        await createSellerTable();
       
        await createBag();
        await getAllBags();

     

        await client.end();
        console.log('DISCONNECTED');

        
    } catch (err) {
        console.error('Error during sync and seed:', err);
        await client.end();
    }
};

const seedData = async () => {
 
        await sellerTable();
        await createBag();
        await getAllBags();
        await createReviewTable();
        await createTables();
        await syncAndSeed();
        await client.end();
  
}

seedData();

