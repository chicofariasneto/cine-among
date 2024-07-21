import {Entity, PrimaryColumn, Column, Index} from 'typeorm';

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

  static initialize({id, title, overview, vote_average}: IMovie): Movie {
    const movie = new Movie();
    movie.id = id;
    movie.title = title;
    movie.overview = overview;
    movie.voteAverage = vote_average;
    return movie;
  }
}
