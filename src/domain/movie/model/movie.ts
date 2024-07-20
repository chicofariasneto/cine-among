import {Entity, PrimaryColumn, Column, Index, ManyToOne} from "typeorm"
import {v4 as uuid} from "uuid";
import Gender from "../../gender/model/gender";

@Entity()
export default class Movie {
  constructor() {
    this.id = this.id || uuid();
  }

  @PrimaryColumn()
  id: string;

  @Index({unique: true})
  @Column()
  name: string;

  @Column()
  year: string;

  @Column()
  trailer: string;

  @ManyToOne(() => Gender, (gender) => gender.movies)
  gender: Gender
}
