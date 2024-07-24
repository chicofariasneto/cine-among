import Environment from '../core/config';
import MovieService from './movie/service/movieService';
import MovieRepositoryDao from './movie/dao/movieRepositoryDao';
import TmdbService from './movie/service/tmdbService';
import TmdbHttpDao from './movie/dao/tmdbHttpDao';
import GenreService from './genre/service/genreService';
import GenreRepositoryDao from './genre/dao/genreRepositoryDao';
import PollService from './poll/service/pollService';
import PollRepositoryDao from './poll/dao/pollRepositoryDao';

class ContextDomain {
  constructor() {
    this.instances = new Map<string, unknown>();
  }

  private instances;

  getMovieService(): MovieService {
    if (this.instances.has('movieService')) {
      return this.instances.get('movieService');
    }

    const movieRepository = this.getMovieRepository();
    this.instances.set('movieService', new MovieService(movieRepository));
    return this.instances.get('movieService');
  }

  getTmdbService(): TmdbService {
    if (this.instances.has('tmdbService')) {
      return this.instances.get('tmdbService');
    }

    const tmdbHttp = this.getTmdbHttpDao();
    this.instances.set('tmdbService', new TmdbService(tmdbHttp));
    return this.instances.get('tmdbService');
  }

  getGenreService(): GenreService {
    if (this.instances.has('genreService')) {
      return this.instances.get('genreService');
    }

    const genreRepository = this.getGenreRepository();
    this.instances.set('genreService', new GenreService(genreRepository));
    return this.instances.get('genreService');
  }

  getPollService(): PollService {
    if (this.instances.has('pollService')) {
      return this.instances.get('pollService');
    }

    const pollRepository = this.getPollRepository();
    this.instances.set('pollService', new PollService(pollRepository));
    return this.instances.get('pollService');
  }

  private getMovieRepository = (): MovieRepositoryDao =>
    new MovieRepositoryDao();

  private getTmdbHttpDao = (): TmdbHttpDao =>
    new TmdbHttpDao(Environment.tmdb.url, Environment.tmdb.token);

  private getGenreRepository = (): GenreRepositoryDao =>
    new GenreRepositoryDao();

  private getPollRepository = (): PollRepositoryDao => new PollRepositoryDao();
}

const contextDomain = new ContextDomain();
export default contextDomain;
