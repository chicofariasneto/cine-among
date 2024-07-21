import {MigrationInterface, QueryRunner} from 'typeorm';

import Genres from '../../utils/genres.json';

export class InsertGenres1721542032882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.synchronize();

    for (const {id, name} of Genres) {
      await queryRunner.query(
        `INSERT INTO public.genre (id, name, count)
         VALUES (${id}, '${name}', 0);`
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.synchronize();

    await queryRunner.query(
      `DELETE
       FROM public.genre
       WHERE TRUE`
    );
  }
}
