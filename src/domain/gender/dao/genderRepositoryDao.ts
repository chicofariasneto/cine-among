import ContextDatabase from "../../../core/database/contextDatabase";
import Gender from "../model/gender";
import IGenderDao from "./genderDao";

export default class GenderRepositoryDao implements IGenderDao {
  constructor() {
    this.connection = new ContextDatabase();
    this.repository = this.connection.getRepository(Gender);
  }

  private connection: ContextDatabase;

  private repository;

  async addGender(gender: Gender): Promise<void> {
    await this.connection.open();
    await this.repository.save(gender);
    await this.connection.close();
  }

  async getGender(name: string): Promise<Gender> {
    await this.connection.open();
    const gender = await this.repository.findOneBy({name});
    await this.connection.close();
    return gender;
  }
}
