import GenderRepositoryDao from "../dao/genderRepositoryDao";
import Gender from "../model/gender";

export default class GenderService {
  constructor(genderRepository: GenderRepositoryDao) {
    this.genderRepository = genderRepository;
  }

  private genderRepository: GenderRepositoryDao;

  async addGender(gender: Gender): Promise<void> {
    await this.genderRepository.addGender(gender);
  }

  async getGenderByName(name: string): Promise<Gender | null> {
    return await this.genderRepository.getGender(name);
  }
}
