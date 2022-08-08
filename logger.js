/*eslint-env node,es6*/
/*eslint-parserOptions ecmaVersion:6 */
/*eslint no-unused-vars: ["error", { "vars": "local", "args":"none"}]*/
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/
/* global app:false, Promise:false */
"use strict";
const moment = require('moment-timezone');
const { createLogger, format } = require('winston');
const { combine, label, printf } = format;
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname +'/config/config.json')[env];
var fs = require('fs');
const { _destroy } = require('winston-daily-rotate-file');
var log_folder = config.log.log_folder;
var app_log_folder = log_folder + "/" + "appLog";

const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);
if (log_folder && !fs.existsSync(log_folder)) {
	fs.mkdirSync(log_folder);
}

if (app_log_folder && !fs.existsSync(app_log_folder)) {
	fs.mkdirSync(app_log_folder);
}

const appendTimestamp = format((info, opts) => {
	if (opts.tz)
		info.timestamp = moment().tz(opts.tz).format();
	return info;
});

var ignored_log_context = []; //['c360_db'];

var transports = [];

if (config.log_to_console === true)
	transports.push(new (require('winston').transports.Console)({
		handleExceptions: true,
		colorize: true,
		humanReadableUnhandledException: true,
		prettyPrint: true,
		timestamp: true
	}));

if (log_folder)
	transports.push(new (require('winston-daily-rotate-file'))({
		filename: app_log_folder + '/Autopayment-User.log',
		handleExceptions: true,
		humanReadableUnhandledException: true,
		timestamp: true,
		prettyPrint: false,
		json: false,
		colorize: false,
		maxFiles: 30,
		maxSize: 300000000 // 300MB Each Log File Size
	}));
var logger = createLogger({
	format: combine(label({ label: 'main' }),
		appendTimestamp({ tz: 'Asia/Yangon' }), myFormat), transports: transports
});

module.exports = function (name) {
	return {
		debug: function (str, param) {
			if (ignored_log_context.indexOf(name) < 0)
				logger.debug(name + ": " + str, param);
		},

		error: function (str, param) {
			logger.error(name + ": " + str, param);
		},

		info: function (str, param) {
			logger.info(name + ": " + str, param);
		},

		warn: function (str, param) {
			logger.warn(name + ": " + str, param);
		}
	};
};