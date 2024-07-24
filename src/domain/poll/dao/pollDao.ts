import Poll from '../model/poll';

export default interface IPollDao {
  addPoll(poll: Poll): Promise<void>;

  getOpenPoll(): Promise<Poll>;
}
