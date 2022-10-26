const { timeStamp } = require("console");
const winston = require("winston");
const format = winston.format;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Tokyo",
  });
};

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: timezoned,
    }),
    format.cli(),
    format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: "app.log", level: "debug" }),
  ],
});

module.exports = logger;
