import * as dotenv from "dotenv"

dotenv.config();

interface Database {
  host: string;
  name: string;
  user: string;
  password: string;
}

interface Node {
  env: string,
  level: string
}

interface IEnvironment {
  database: Database,
  node: Node
}

export default {
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  node: {
    env: process.env.NODE_ENV || "staging",
    level: process.env.NODE_LEVEL || "info"
  }
} as IEnvironment
