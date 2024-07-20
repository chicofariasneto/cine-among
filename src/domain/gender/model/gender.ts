import {Entity, PrimaryColumn, Column, Index, OneToMany} from "typeorm"
import {v4 as uuid} from "uuid";
import Movie from "../../movie/model/movie";

@Entity()
export default class Gender {
  constructor(name?: string) {
    this.id = this.id || uuid();

    if (name) {
      this.name = name;
    }
  }

  @PrimaryColumn()
  id: string;

  @Index({unique: true})
  @Column()
  name: string;

  @OneToMany(() => Movie, (movie) => movie.gender)
  movies: Movie[]
}
