const client = require('./client.cjs');

const createBag = async () => {
    try{
        const {row: [ bagInfo] } = await client.query(`
            INSERT INTO sellers (BagName, Brand, ReleaseDate, Description and Price)
            VALUES ('${BagName}', '${Brand}', '${ReleaseDate}', '${Description}', '${Price}',)
            RETURNING *;
            `);

            console.log(bagInfo);
            return bagInfo;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createBag
}