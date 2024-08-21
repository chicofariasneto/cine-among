import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Poll from '../../poll/model/poll';

interface IMovie {
  id: string;
  title: string;
  overview?: string;
  vote_average?: string;
}

@Entity()
export default class Movie {
  constructor() {}

  @PrimaryColumn()
  id: string;

  @Index({unique: true})
  @Column()
  title: string;

  overview: string | undefined;

  voteAverage: string | undefined;

  teaser: string;

  @OneToOne(() => Poll)
  @JoinColumn()
  poll: Poll;

  static initialize({id, title, overview, vote_average}: IMovie): Movie {
    const movie = new Movie();
    movie.id = id;
    movie.title = title;
    movie.overview = overview;
    movie.voteAverage = vote_average;
    return movie;
  }
}
