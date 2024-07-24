import IPollDao from './pollDao';
import Poll from '../model/poll';
import ContextDatabase from '../../../core/database/contextDatabase';

export default class PollRepositoryDao implements IPollDao {
  constructor() {
    this.connection = new ContextDatabase();
    this.repository = this.connection.getRepository(Poll);
  }

  private connection: ContextDatabase;

  private repository;

  async addPoll(poll: Poll): Promise<void> {
    await this.connection.open();
    await this.repository.save(poll);
    await this.connection.close();
  }

  async getOpenPoll(): Promise<Poll> {
    await this.connection.open();
    const poll = await this.repository.find({
      where: {
        active: true,
      },
    });
    await this.connection.close();
    return poll[0];
  }
}
