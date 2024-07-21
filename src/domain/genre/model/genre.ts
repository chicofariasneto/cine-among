import {Entity, PrimaryColumn, Column, Index} from "typeorm"

@Entity()
export default class Genre {
  @PrimaryColumn()
  id: number;

  @Index({unique: true})
  @Column()
  name: string;

  @Column()
  count: number;
}
