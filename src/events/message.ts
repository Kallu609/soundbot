import { Message } from 'node-telegram-bot-api';
import { BotResponse, UserActions } from '.';
import { bot, reply } from '../bot';
import {
  addSound,
  clearUserAction,
  getLastSound,
  getSoundFromUser,
  getUserAction,
} from '../database';
import { extractName } from '../lib/telegramHelper';

export function messageHandler() {
  bot.on('message', async (msg: Message) => {
    if (!msg.from || msg.from.is_bot || !msg.text) {
      return;
    }

    const currentAction = await getUserAction(msg.from.id);

    if (currentAction !== UserActions.WritingName) {
      return;
    }

    const lastSound = await getLastSound(msg.from.id);
    const identifier = msg.text.toLowerCase();

    if (!identifier || identifier.startsWith('/')) {
      return await reply(msg, BotResponse.NoVoiceOrAudio);
    }

    const soundExists = await getSoundFromUser(msg.from.id, identifier);

    if (soundExists) {
      return await reply(msg, BotResponse.IdentifierExists);
    }

    await addSound(msg.from.id, {
      ...lastSound,
      identifier,
    });

    await clearUserAction(msg.from.id);
    await reply(
      msg,
      `🥳 ${extractName(msg)}, your sound was added. Type /list to see sounds`
    );
  });
}