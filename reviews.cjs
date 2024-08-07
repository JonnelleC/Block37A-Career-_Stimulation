const client = require('./client.cjs');

const createReviewTable = async () => {
    try {
        
        await client.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                ReviewID SERIAL PRIMARY KEY,
                Username VARCHAR(50) NOT NULL,
                BagName VARCHAR(255) NOT NULL,
                Description TEXT
            );
        `);
        console.log('Reviews table created successfully.');
    } catch (err) {
        console.error('Error creating reviews table:', err);
    } finally {
       
    }
};


createReviewTable();


const getAllReviews = async () => {
    try {
      
        const res = await client.query('SELECT * FROM reviews');
        await client.end();
        return res.rows;
    } catch (err) {
        console.error('Error fetching reviews:', err);
        
        throw err;
    }
};

module.exports = { getAllReviews, 
    createReviewTable
};