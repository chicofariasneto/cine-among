import ContextDatabase from '../../../core/database/contextDatabase';
import Genre from '../model/genre';
import IGenreDao from './genreDao';

export default class GenreRepositoryDao implements IGenreDao {
  constructor() {
    this.connection = new ContextDatabase();
    this.repository = this.connection.getRepository(Genre);
  }

  private connection: ContextDatabase;

  private repository;

  async addGenre(gender: Genre): Promise<void> {
    await this.connection.open();
    await this.repository.save(gender);
    await this.connection.close();
  }

  async getGenre(id: number): Promise<Genre> {
    await this.connection.open();
    const gender = await this.repository.find({
      where: {
        id: id,
      },
    });
    await this.connection.close();
    return gender[0];
  }

  async getNextGenre(): Promise<Genre> {
    await this.connection.open();
    const gender = await this.repository.find({
      order: {
        count: 'ASC',
        id: 'ASC',
      },
      take: 1,
    });
    await this.connection.close();
    return gender[0];
  }
}
