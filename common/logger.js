var log4js =require("log4js");

log4js.configure('./config/log4js.json');


logger = log4js.getLogger();

module.exports = logger;