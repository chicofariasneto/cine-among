import winston from "winston";

import Environment from "../config";

const logger = winston.createLogger({
  level: Environment.node.level,
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});

export default logger;
