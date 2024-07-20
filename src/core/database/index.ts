import {DataSource} from "typeorm";

import Environment from "../config";
import Movie from "../../domain/movie/model/movie";
import Gender from "../../domain/gender/model/gender";

export default new DataSource({
  type: "postgres",
  host: Environment.database.host,
  port: 5432,
  username: Environment.database.user,
  password: Environment.database.password,
  database: Environment.database.name,
  schema: "public",
  synchronize: true,
  logging: false,
  entities: [Movie, Gender],
  migrations: [],
  subscribers: []
});
