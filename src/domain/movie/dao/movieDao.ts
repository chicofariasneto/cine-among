import Movie from "../model/movie";

export default interface IMovieDao {
  addMovie(movie: Movie): Promise<void>;
}
