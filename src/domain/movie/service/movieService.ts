import MovieRepositoryDao from "../dao/movieRepositoryDao";
import Movie from "../model/movie";

export default class MovieService {
  constructor(movieRepository: MovieRepositoryDao) {
    this.movieRepository = movieRepository;
  }

  private movieRepository: MovieRepositoryDao;

  async addMovie(movie: Movie): Promise<void> {
    await this.movieRepository.addMovie(movie);
  }
}
