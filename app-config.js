/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const cors = require('cors');
const ExpressConfigModule = require('./express-config');
const session = require('express-session');
var logger = require('../logger')('User');
const config = require("../config/config.json")
require('../models/users');
require('../config/passport');
var multer = require('multer');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk')

class AppConfig {
  constructor(app) {
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
      // application specific logging, throwing an error, or other logic here
    });
    this.app = app;
  }



  includeConfig() {
    this.loadAppLevelConfig();
    this.loadExpressConfig();
  }

  loadAppLevelConfig() {
    this.app.use(
      bodyParser.json(),
    );
    
    this.app.use(
      cors(),
    );
    this.app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

    const s3 = new aws.S3({
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      region: config.AWS_DEFAULT_REGION
    })

   /* var storage = multerS3({
      s3: s3,
      bucket: config.AWS_BUCKET_S3_SUMMARY,
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
      },
      key: (req, file, cb) => {
        cb(null, config.upload_aws_folder +Date.now() + '-' + file.originalname)
      }
    });

    var upload = multer({ storage: storage });
    global.upload = upload;
    */
    this.app.use(function (err, req, res, next) {

      console.log(err);
  
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
  
      //logger.error(err);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header("Access-Control-Allow-Headers", "Authorization,X-ACCESS_TOKEN,Access-Control-Allow-Headers, Origin,Accept,X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
  
      res.status(err.status || 500);
      res.send('Invalid API Request ');
  });

  }

  loadExpressConfig() {
    new ExpressConfigModule(this.app).setAppEngine();
    //new JWT(this.app).setJWTConfig();
  }
}
module.exports = AppConfig;
