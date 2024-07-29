# Example Docker Compose project for Telegraf, InfluxDB and Grafana

This an example project to show the TIG (Telegraf, InfluxDB and Grafana) stack.

![Example Screenshot](./example.png?raw=true "Example Screenshot")

## Start the stack with docker compose

```bash
$ docker-compose up
```

## Services and Ports

### Grafana
- URL: http://localhost:3000 
- User: admin 
- Password: admin 

### Telegraf
- Port: 8125 UDP (StatsD input)

### InfluxDB
- Port: 8086 (HTTP API)
- User: admin 
- Password: admin 
- Database: influx


Run the influx client:

```bash
$ docker-compose exec influxdb influx -execute 'SHOW DATABASES'
```

Run the influx interactive console:

```bash
$ docker-compose exec influxdb influx

Connected to http://localhost:8086 version 1.8.0
InfluxDB shell version: 1.8.0
>
```

[Import data from a file with -import](https://docs.influxdata.com/influxdb/v1.8/tools/shell/#import-data-from-a-file-with-import)

```bash
$ docker-compose exec -w /imports influxdb influx -import -path=data.txt -precision=s
```

##  Generating a load on MongoDB

#### Generating a write load to MongoDB
```bash
ab -n 100 -c 10 -p post_data.json -T application/json http://localhost/mongo
Killed by Ctrl+C
```
#### Generating read load from MongoDB
```bash
ab -n 1000 -c 10 http://localhost/mongo
Killed by Ctrl+C
```

##  Generating a load on Elasticsearch

#### Generating a record load to Elasticsearch
```bash
ab -n 1000 -c 10 -p post_data.json -T application/json http://localhost/elasticsearch
Killed by Ctrl+C
```
#### Generating read load with Elasticsearch
```bash
ab -n 1000 -c 10 http://localhost/elasticsearch
Killed by Ctrl+C
```
