import {Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import Genre from '../../genre/model/genre';

@Entity()
export default class Poll {
  constructor(id: string, genre: Genre) {
    this.id = id;
    this.genre = genre;
    this.active = true;
  }

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Genre, genre => genre.polls)
  genre: Genre;

  @Column()
  active: boolean;
}
