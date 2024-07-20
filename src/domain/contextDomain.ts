import MovieService from "./movie/service/movieService";
import MovieRepositoryDao from "./movie/dao/movieRepositoryDao";
import GenderService from "./gender/service/genderService";
import GenderRepositoryDao from "./gender/dao/genderRepositoryDao";

class ContextDomain {
  constructor() {
    this.instances = new Map<string, any>();
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

  getGenderService(): GenderService {
    if (this.instances.has('genderService')) {
      return this.instances.get('genderService');
    }

    const genderRepository = this.getGenderRepository();
    this.instances.set('genderService', new GenderService(genderRepository));
    return this.instances.get('genderService');
  }

  private getMovieRepository = (): MovieRepositoryDao => new MovieRepositoryDao();

  private getGenderRepository = (): GenderRepositoryDao => new GenderRepositoryDao();
}

const contextDomain = new ContextDomain();
export default contextDomain;
