import Movie from '../model/movie';
import contextAsyncHttp from '../../../core/http/contextAsyncHttp';
import ITmdbHttpDao from './tmdbDao';
import AsyncHttp from '../../../core/http/asyncHttp';

export default class TmdbHttpDao implements ITmdbHttpDao {
  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
    this.httpClient = contextAsyncHttp.getAsyncHttpClient();
  }

  private url: string;

  private token: string;

  private httpClient: AsyncHttp;

  async getMoviesByParams(params: object): Promise<Array<Movie>> {
    const {results} = await this.httpClient.get(
      `${this.url}/discover/movie`,
      this.token,
      params
    );

    return results.map(movie => Movie.initialize(movie));
  }

  async setTeaserKeyMovie(movie: Movie): Promise<void> {
    const {results} = await this.httpClient.get(
      `${this.url}/movie/${movie.id}/videos`,
      this.token,
      {
        language: 'en-US',
      }
    );

    let key;
    for (const teaser of results as Array<{site: string; key: string}>) {
      if (teaser.site === 'YouTube') {
        key = teaser.key;
        break;
      }
    }

    movie.teaser = `https://www.youtube.com/watch?v=${key}`;
  }
}
