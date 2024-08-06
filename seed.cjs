const client = require('./client.cjs');

const createTables = async () => {
    try{
        await client.query(`
        
            
            `)
    }
}


const seedData = async () => {
    try{
        await client.query(`
            `)
    }
}

const syncAndSeed = async () => {
    try{
        await client.connect();
        console.log('CONNECTED')

        await createTables();
        await seedData();
        
        await client.end();
        console.log('DISCONNECTED');
    }
}