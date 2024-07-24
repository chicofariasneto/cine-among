import logger from '../core/utils/logging';
import contextClientDiscord from '../core/bot/contextClientDiscord';

export const handler = async (): Promise<void> => {
  try {
    const clientDiscord = contextClientDiscord.getClientDiscord();

    await clientDiscord.finishPoll();
  } catch (e: unknown) {
    logger.error(`Error ${e}`);
    throw e;
  }
};

handler().then();
