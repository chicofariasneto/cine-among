import {Entity, PrimaryColumn, Column, Index, OneToMany} from 'typeorm';
import Poll from '../../poll/model/poll';

@Entity()
export default class Genre {
  @PrimaryColumn()
  id: number;

  @Index({unique: true})
  @Column()
  name: string;

  @Column()
  count: number;

  @OneToMany(() => Poll, poll => poll.genre)
  polls: Poll[];
}
