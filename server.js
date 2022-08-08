/* eslint-disable no-console */
var cluster = require('cluster');
const express = require('express');
const http = require('http');
const bodyParser =require('body-parser')

const AppConfig = require('./config/app-config');
const Routes = require('./routes');

const numCPUs = require('os').cpus().length;
class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
  }

  appConfig() {
    new AppConfig(this.app).includeConfig();
  }

  /* Including app Routes starts */
  includeRoutes() {
    new Routes(this.app).routesConfig();
  }
  /* Including app Routes ends */

  startTheServer() {
    /*this.app.use(function (req, res, next) { 
  
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header("Access-Control-Allow-Headers", "Authorization,X-ACCESS_TOKEN,Access-Control-Allow-Headers, Origin,Accept,X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      next();
    });*/

    this.appConfig();
    this.includeRoutes();

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    //this.app.use(express.urlencoded());

    this.appConfig();
    this.includeRoutes();

    this.app.set('port', 8009);
    if(cluster.isMaster) { 
      console.log("Entry to master")
      console.log("CPU count ",numCPUs)
      for (var i = 0; i < numCPUs; i++) { 
          cluster.fork(); 
      } 
    }else{
      console.log("Listen server : ")
      const server = http.createServer(this.app);
      server.listen(8009);
      server.setTimeout(600000);
    }    


    /*const port = process.env.NODE_SERVER_POST || 8004;
    const host = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });*/
  }
}

module.exports = new Server();
