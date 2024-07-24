import PollRepositoryDao from '../dao/pollRepositoryDao';
import Poll from '../model/poll';

export default class PollService {
  constructor(pollRepository: PollRepositoryDao) {
    this.pollRepository = pollRepository;
  }

  private pollRepository: PollRepositoryDao;

  async addPoll(poll: Poll): Promise<void> {
    await this.pollRepository.addPoll(poll);
  }

  async getCurrentPoll(): Promise<Poll> {
    return await this.pollRepository.getOpenPoll();
  }

  async finishPoll(poll: Poll): Promise<void> {
    return await this.pollRepository.addPoll(poll);
  }
}
