import ClientDiscord from './clientDiscord';
import Environment from '../config';

class ContextClientDiscord {
  private instance;

  getClientDiscord(): ClientDiscord {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ClientDiscord(
      Environment.discord.channelId,
      Environment.discord.token
    );
    return this.instance;
  }
}

const contextClientDiscord = new ContextClientDiscord();
export default contextClientDiscord;
