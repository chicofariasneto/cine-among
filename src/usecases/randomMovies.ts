import Movie from '../domain/movie/model/movie';
import logger from '../core/utils/logging';
import contextDomain from '../domain/contextDomain';

export const handler = async (): Promise<Array<Movie>> => {
  try {
    const genreService = contextDomain.getGenreService();
    const tmdbService = contextDomain.getTmdbService();
    const movieService = contextDomain.getMovieService();

    const genre = await genreService.getNextGenre();
    console.log(genre);

    let page = 2;
    let filteredMovies: Array<Movie> = [];

    do {
      const movies = await tmdbService.getMoviesByGenreAndPopularity(2, genre.id);
      const ids = movies.map(movie => movie.id);

      const excludedMovies = await movieService.getMoviesIdsByIds(ids);
      const excludedIds = excludedMovies.map(movie => movie.id);
      filteredMovies = filteredMovies.concat(
        movies.filter(movie => {
          if (!excludedIds.includes(movie.id)) {
            return movie;
          }
        })
      );
      page++;
    } while (filteredMovies.length < 10);

    const listMovies = filteredMovies.slice(0, 10);
    for (const movie of listMovies) {
      await tmdbService.setTeaserMovie(movie);
    }

    return listMovies;
  } catch (e: unknown) {
    logger.error(`Error ${e}`);
    throw e;
  }
};
