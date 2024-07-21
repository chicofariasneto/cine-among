import TmdbHttpDao from '../dao/tmdbHttpDao';
import Movie from '../model/movie';

export default class TmdbService {
  constructor(tmdbHttp: TmdbHttpDao) {
    this.tmdbHttp = tmdbHttp;
  }

  private tmdbHttp: TmdbHttpDao;

  async getMoviesByGenreAndPopularity(
    page: number,
    genreId: number
  ): Promise<Array<Movie>> {
    const params = {
      include_adult: true,
      language: 'pt-BR',
      page: page,
      'vote_average.gte': 7,
      with_genres: genreId,
      sort_by: 'popularity.desc',
    };

    const movies = await this.tmdbHttp.getMoviesByParams(params);

    return movies;
  }

  async setTeaserMovie(movie: Movie): Promise<void> {
    return await this.tmdbHttp.setTeaserKeyMovie(movie);
  }
}
