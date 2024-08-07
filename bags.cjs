const client = require('./client.cjs');


const createBag = async () => {
    try{
        const {row: [ bagInfo] } = await client.query(`
            INSERT INTO sellers (bagname, Brand, releasedate, description and price)
            VALUES ('${bagname}', '${brand}', '${releasedate}', '${description}', '${price}',)
            RETURNING *;
            `);

            console.log(bagInfo);
            return bagInfo;
    } catch (err) {
        console.log(err);
    }
}

const getAllBags = async () => {
    try{
        const { rows } = await client.query(`
            SELECT * From BAGS;
            `);
            return rows;
    } catch (err){
        console.log(err);
    }
}   


module.exports = {
    createBag,
    getAllBags
}