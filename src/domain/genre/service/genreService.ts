import GenreRepositoryDao from '../dao/genreRepositoryDao';
import Genre from '../model/genre';

export default class GenreService {
  constructor(genreRepository: GenreRepositoryDao) {
    this.genreRepository = genreRepository;
  }

  private genreRepository: GenreRepositoryDao;

  async updateCountGenre(genre: Genre): Promise<void> {
    await this.genreRepository.addGenre(genre);
  }

  async getGenreById(id: number): Promise<Genre> {
    return await this.genreRepository.getGenre(id);
  }

  async getNextGenre(): Promise<Genre> {
    return await this.genreRepository.getNextGenre();
  }
}
