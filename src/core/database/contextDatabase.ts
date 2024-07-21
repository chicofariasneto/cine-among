import {DataSource, EntityTarget, ObjectLiteral, Repository} from 'typeorm';

import AppDataSource from './index';

export default class ContextDatabase {
  private connection: DataSource;

  constructor() {
    this.connection = AppDataSource;
  }

  async open(): Promise<void> {
    if (!this.connection.isInitialized) {
      await this.connection.initialize();
    }
  }

  async close(): Promise<void> {
    if (this.connection.isInitialized) {
      await this.connection.destroy();
    }
  }

  getRepository(
    entity: EntityTarget<ObjectLiteral>
  ): Repository<ObjectLiteral> {
    return this.connection.getRepository(entity);
  }
}
