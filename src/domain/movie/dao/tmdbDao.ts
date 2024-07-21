import Movie from '../model/movie';

export default interface ITmdbHttpDao {
  getMoviesByParams(params: object): Promise<Array<Movie>>;
}
