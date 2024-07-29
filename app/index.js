const express = require('express');
const { MongoClient } = require('mongodb');
const { Client } = require('@elastic/elasticsearch');

const app = express();
const port = 3000;

// MongoDB конфігурація
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'testdb';

// Elasticsearch client
const esClient = new Client({ node: 'http://elasticsearch:9200' });

// Connecting to MongoDB
let db;
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    db = client.db(dbName);
    console.log('Connected to MongoDB');
});

// A simple route to check the server
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route for writing data to MongoDB
app.post('/mongo', async (req, res) => {
    try {
        const collection = db.collection('testcollection');
        const result = await collection.insertOne({ message: 'Hello, MongoDB!' });
        res.json(result);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

// Route to read data from MongoDB
app.get('/mongo', async (req, res) => {
    try {
        const collection = db.collection('testcollection');
        const docs = await collection.find().toArray();
        res.json(docs);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

// Route for writing data to Elasticsearch
app.post('/elasticsearch', async (req, res) => {
    try {
        const result = await esClient.index({
            index: 'testindex',
            body: { message: 'Hello, Elasticsearch!' }
        });
        res.json(result);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

// Route to read data from Elasticsearch
app.get('/elasticsearch', async (req, res) => {
    try {
        const { body } = await esClient.search({
            index: 'testindex',
            body: {
                query: {
                    match_all: {}
                }
            }
        });
        res.json(body.hits.hits);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
