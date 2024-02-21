# Workshop3
This is the project of the group for Decentralisation Tethnologies Workshop 3\

Our dataset :
https://www.kaggle.com/datasets/nelgiriyewithana/new-york-housing-market\




# Part B

For this part, don't forget to run *npm install* in the terminal.\
Here are the correspondance for the name of the files and the question numbers :

## Q1 Simple Hello World Serve
at first, the hello world server was running on the port 3000, but it has been moved, to let space for the apis(question4)

now, it is using port 3001.

## Q2 DNS Registry

## Q3 Database Implementation
*PostGreSQL* folder for sql files.\
*DB_api.js* for viewing all APIs to the database.\
*DB_connection.js* for the setup of connection between js and postgresql.

### Database creation :

We chose to make a PostgreSQL database. For that, we used pgadmin.\
We created  user "decentralization_user" and we created a database owned by this user : "decentralization_workshop3".
Do not forget to add a password to the user like so "Password01"
In these, we implemented our two .sql files, CreaPark and InsPark.

### APIs

For having the APIs work, run "node DB_api.js" in the terminal.

## Q4 Modify Server Implementation for API Requirements
now the port that was used for the hello world server is used for the DB_api.js

## Q5 Simple Frontend

## Q6 Simulate Server Issue and Fix

I created a second api "get /products" with an intentionnal Error next to the original one (i put it in comment so that it doesnt affecrt the actual code)
The result of this error for the custommer would be that he would recvieve this specific error from the server with the code 505 : "Internal Server Error - Simulated" That would be sent as an http response 

## Q7 Synchronous Mirroring

Q8 Asynchronous Replication
