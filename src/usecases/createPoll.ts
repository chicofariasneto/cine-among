import Movie from '../domain/movie/model/movie';
import contextDomain from '../domain/contextDomain';
import contextClientDiscord from '../core/bot/contextClientDiscord';
import {createMessageMovies} from '../core/utils/message';
import {PollAnswerData} from 'discord.js';

export const handler = async (): Promise<void> => {
  try {
    const genreService = contextDomain.getGenreService();
    const tmdbService = contextDomain.getTmdbService();
    const movieService = contextDomain.getMovieService();
    const clientDiscord = contextClientDiscord.getClientDiscord();

    const genre = await genreService.getNextGenre();

    let page = 2;
    let filteredMovies: Array<Movie> = [];
    do {
      const movies = await tmdbService.getMoviesByGenreAndPopularity(
        page,
        genre.id
      );
      const ids = movies.map(movie => movie.id);

      const excludedMovies = await movieService.getMoviesIdsByIds(ids);
      const excludedIds = excludedMovies.map(movie => movie.id);
      filteredMovies = filteredMovies.concat(
        movies.filter(movie => !excludedIds.includes(movie.id))
      );
      page++;
    } while (filteredMovies.length < 10);
    const listMovies = filteredMovies.slice(0, 10);
    for (const movie of listMovies) {
      await tmdbService.setTeaserMovie(movie);
    }

    const messages = createMessageMovies(listMovies);

    const answers: Array<PollAnswerData> = [];
    for (const movie of listMovies) {
      answers.push({text: `${movie.id} - ${movie.title}`});
    }

    await clientDiscord.createPoll(
      messages,
      'Qual filme você gostaria de assistir no CineAmong?',
      answers,
      genre
    );
  } catch (e: unknown) {
    console.error(`Error ${e}`);
    throw e;
  }
};
