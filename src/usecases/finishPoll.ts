import contextClientDiscord from '../core/bot/contextClientDiscord';

export const handler = async (): Promise<void> => {
  try {
    const clientDiscord = contextClientDiscord.getClientDiscord();
    await clientDiscord.finishPoll();
  } catch (e: unknown) {
    console.error(`Error ${e}`);
    throw e;
  }
};
