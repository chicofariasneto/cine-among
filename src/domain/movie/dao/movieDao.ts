import Movie from '../model/movie';

export default interface IMovieDao {
  addMovie(movie: Movie): Promise<void>;

  getMoviesIds(moviesId: Array<string>): Promise<Array<Movie>>;
}
