import {DataSource} from 'typeorm';

import Environment from '../config';
import Movie from '../../domain/movie/model/movie';
import Genre from "../../domain/genre/model/genre";

import {InsertGenres1721542032882} from "./migrations/1721542032882-insertGenres";

export default new DataSource({
  type: 'postgres',
  host: Environment.database.host,
  port: 5432,
  username: Environment.database.user,
  password: Environment.database.password,
  database: Environment.database.name,
  schema: 'public',
  synchronize: true,
  logging: false,
  entities: [Movie, Genre],
  migrations: [InsertGenres1721542032882],
  subscribers: [],
});
