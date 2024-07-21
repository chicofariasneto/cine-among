import Genre from "../model/genre";

export default interface IGenreDao {
  addGenre(gender: Genre): Promise<void>;

  getGenre(id: number): Promise<Genre>;

  getNextGenre(): Promise<Genre>;
}
