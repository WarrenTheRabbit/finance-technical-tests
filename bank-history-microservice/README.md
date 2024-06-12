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


## Usage
