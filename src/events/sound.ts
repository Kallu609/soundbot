import camelcaseKeys = require('camelcase-keys');
import { Audio, Message } from 'node-telegram-bot-api';
import { botResponses, userActions } from '.';
import { bot, reply } from '../bot';
import {
  addSound,
  clearUserAction,
  getSound,
  getUserAction,
  setCurrentSound,
  setUserAction,
} from '../database';
import { ISound } from '../interfaces/types';
import { extractName } from '../utils/telegramHelper';

export function soundHandler() {
  const listener = async (msg: Message) => {
    if (!msg.from) {
      return;
    }

    const currentAction = await getUserAction(msg.from.id);

    if (currentAction !== userActions.sendingSound) {
      return;
    }

    if (!msg.voice && !msg.audio) {
      return reply(msg, botResponses.noVoiceOrAudio);
    }

    const fileSize =
      (msg.voice ? msg.voice.file_size : (msg.audio as Audio).file_size) || 0;

    if (fileSize > Math.pow(10, 6)) {
      return reply(msg, 'Too big file');
    }

    const sound = camelcaseKeys(msg.voice || msg.audio) as ISound;

    /*
    const caption = msg.caption as string;
    const useCaption = caption && /\w[\w ]+/.test(caption);

    if (useCaption) {
      const soundExists = await getSound(caption);

      if (soundExists) {
        await setCurrentSound(msg.from.id, sound);
        await setUserAction(msg.from.id, userActions.writingName);
        return reply(msg, `🤨 Sound with that name exists, try again below`);
      }

      await addSound(msg.from.id, {
        identifier: caption,
        fileId: sound.fileId,
      });

      await clearUserAction(msg.from.id);
      return reply(
        msg,
        `🥳 ${extractName(msg)}, your sound was added. Type /list to see sounds`
      );
    }
    */

    await setCurrentSound(msg.from.id, sound);
    await setUserAction(msg.from.id, userActions.writingName);
    reply(
      msg,
      `🤩 Thank you ${extractName(msg)}! What name would you want for it?`
    );
  };

  bot.on('audio', listener);
  bot.on('voice', listener);
}
