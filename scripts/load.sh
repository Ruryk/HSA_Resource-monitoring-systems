ab -n 10000 -c 100 -p post_data.json -T application/json http://localhost:8080/mongo
ab -n 10000 -c 100 -p post_data.json -T application/json http://localhost:8080/elasticsearch
ab -n 10000 -c 100 -p http://localhost:8080/elasticsearch
ab -n 10000 -c 100 -p http://localhost:8080/elasticsearch
