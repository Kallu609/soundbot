import * as TelegramBot from 'node-telegram-bot-api';
import { Message } from 'node-telegram-bot-api';
import { eventHandler } from './events';
import { BotError } from './lib/customErrors';

const botToken = process.env.BOT_TOKEN;

if (!botToken) {
  throw new BotError('No bot token found.');
}

export const bot = new TelegramBot(botToken);

export async function startBot() {
  bot.startPolling();
  eventHandler();

  console.log('Bot running');
}

export async function reply(msg: Message, text: string) {
  bot.sendMessage(msg.chat.id, text, {
    parse_mode: 'Markdown',
  });
}
