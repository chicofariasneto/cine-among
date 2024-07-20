import Gender from "../model/gender";

export default interface IGenderDao {
  addGender(gender: Gender): Promise<void>;

  getGender(name: string): Promise<Gender>;
}
