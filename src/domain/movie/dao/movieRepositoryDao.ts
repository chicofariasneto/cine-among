import ContextDatabase from "../../../core/database/contextDatabase";
import Movie from "../model/movie";
import IMovieDao from "./movieDao";

export default class MovieRepositoryDao implements IMovieDao {
  constructor() {
    this.connection = new ContextDatabase();
    this.repository = this.connection.getRepository(Movie);
  }

  private connection: ContextDatabase;

  private repository;

  async addMovie(movie: Movie): Promise<void> {
    await this.connection.open();
    await this.repository.save(movie);
    await this.connection.close();
  }
}
