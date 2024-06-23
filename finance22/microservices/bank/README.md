### README
This is a simple microservice for storing the bank history of a user - exactly
how UP stores it.

The idea is that we have three microservices services:
- bank history service (owns our own version of Up's data by storing it in a NoSQL database)
- bank events service (listens to Up for bank events)
- transactions service (stores transactions in a SQL database)

And one coordinating microservice, bank synchronisation, that uses the three
standalone microservices to keep an updated bank history in our SQL database.

## Planned steps
1. Setup MongoDB
2. Write a Repository object for MongoDB
3. Write business logic (collecting and storing history from time A to time B)

## Set up environment
For Ubuntu 22.04:
``` 
docker pull mongodb/mongodb-community-server:latest
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
wget https://downloads.mongodb.com/compass/mongodb-mongosh_2.2.6_amd64.deb
wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | sudo tee /etc/apt/trusted.gpg.d/server-7.0.asc
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-mongosh
mongosh --version
```
Further proof it is working:
```
mongosh --port 27017
db.runCommand(
   {
      hello: 1
   }
)

## Usage
use bank_history
