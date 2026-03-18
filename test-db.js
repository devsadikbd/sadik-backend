const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.DATABASE_URL;
console.log('Testing connection to:', url.replace(/:([^:@]+)@/, ':****@'));

const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });

async function run() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('Detailed connection error:');
    console.dir(err, { depth: null });
  } finally {
    await client.close();
  }
}

run();
