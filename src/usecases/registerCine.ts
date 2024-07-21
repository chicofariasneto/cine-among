import contextDomain from '../domain/contextDomain';
import Movie from '../domain/movie/model/movie';
import logger from '../core/utils/logging';

interface MovieRequest {
  id: string;
  title: string;
}

export interface AddMovieRequest {
  movie: MovieRequest;
  genreId: number;
}

export const handler = async (request: AddMovieRequest): Promise<void> => {
  try {
    const genreService = contextDomain.getGenreService();
    const movieService = contextDomain.getMovieService();

    const genre = await genreService.getGenreById(request.genreId);
    genre.count = genre.count + 1;

    const movie = Movie.initialize({
      id: request.movie.id,
      title: request.movie.title,
    });

    await genreService.updateCountGenre(genre);
    await movieService.addMovie(movie);

    logger.info(`Movie ${movie.title} has been registered.`);
  } catch (e: unknown) {
    logger.error(`Error ${e}`);
    throw e;
  }
};
