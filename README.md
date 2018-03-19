# Express Mongo Nodejs

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

Express nodeJS template is ready to go for projects by which you can do API calls and access the data from the database. This template handles database fatal errors and also logs it in a file.

# Download and Installation

  
To begin using this framework, choose one of the following options to get started:

Clone the repo: https://github.com/pournima108/mongo-express-node.git
Fork clone or download on Github.



### Usage

After downloading, simply edit mongodb.js and connection.js file included with the framework for re-usability in your favorite text editor to make changes or if you are using any other database so configure it in that file. In routes.js file you need to define routes if you want to, otherwise basic routes are already defined with the same endpoint. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can run the index.js file in console.

You need to configure .env file and give database credentials to it.

### Tech
Template uses a number of open source projects to work properly. The following tools were used:

node.js - evented I/O for the backend
Express - fast node.js network app framework
winston - A multi-transport async logging library for node.js.
MongoDB -A nosql database which has document structure


### Installation

This template requires Node.js v6+ to run. Install the dependencies and devDependencies and start the server.

$ cd express-sample-nodejs
$ npm install
$ node index.js
For production environments...

$ NODE_ENV=production node index.js

