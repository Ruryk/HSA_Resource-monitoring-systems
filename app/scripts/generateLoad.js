const { exec } = require('child_process');

const mongoUrl = 'http://localhost:8080/mongo'; // The URL to test
const elasticsearchUrl = 'http://localhost:8080/elasticsearch'; // The URL to test
const numberOfRequests = 10000; // Total number of requests to perform
const concurrencyLevel = 100; // Number of multiple requests to make at a time

// const commandMongo = `ab -n ${numberOfRequests} -c ${concurrencyLevel} ${mongoUrl}`;
//
// const commandElasticsearch = `ab -n ${numberOfRequests} -c ${concurrencyLevel} ${elasticsearchUrl}`;

const commandMongo = `ab -n ${numberOfRequests} -c ${concurrencyLevel} -p post_data.json -T application/json ${mongoUrl}`;

const commandElasticsearch = `ab -n ${numberOfRequests} -c ${concurrencyLevel} -p post_data.json -T application/json ${elasticsearchUrl}`;

exec(commandMongo, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing ab: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`ab stderr: ${stderr}`);
    return;
  }
  console.log(`ab stdout:\n${stdout}`);
});

exec(commandElasticsearch, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing ab: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`ab stderr: ${stderr}`);
    return;
  }
  console.log(`ab stdout:\n${stdout}`);
});